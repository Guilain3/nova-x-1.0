'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Scale, Shield, FileText, X, AlertCircle, CircleCheck, Circle } from 'lucide-react';
import axios from 'axios';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UploadDropzone } from '@/utils/uploadthing';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

// Map of document IDs to their corresponding DocumentType in the database
const DOCUMENT_TYPE_MAP = {
  certificate: 'REGISTRATION_CERTIFICATE',
  taxClearance: 'TAX_CLEARANCE',
  identification: 'KEY_PERSON_ID',
  license: 'PRACTICE_LICENSE',
};

const formSchema = z.object({
  certificate: z.array(z.object({
    fileUrl: z.string(),
    fileName: z.string(),
    documentId: z.string().optional() // Store DB ID after saving
  })).optional(),
  taxClearance: z.array(z.object({
    fileUrl: z.string(),
    fileName: z.string(),
    documentId: z.string().optional()
  })).optional(),
  identification: z.array(z.object({
    fileUrl: z.string(),
    fileName: z.string(),
    documentId: z.string().optional()
  })).optional(),
  license: z.array(z.object({
    fileUrl: z.string(),
    fileName: z.string(),
    documentId: z.string().optional()
  })).optional(),
});

type FormData = z.infer<typeof formSchema>;

// KYC steps 
const KYC_STEPS = [
  {
    id: 'certificate',
    label: 'Certificate of registration',
    title: 'Certificate of registration confirmation',
    iconType: 'Shield',
    documents: {
      name: 'Kigali Craft',
      regulatoryBody: 'RURA',
      validityPeriod: 'September 11th, 2024',
      verificationInformation: 'Checked'
    }
  },
  {
    id: 'taxClearance',
    label: 'Tax clearance certificate',
    title: 'Tax clearance certificate confirmation',
    iconType: 'FileText',
    documents: {
      name: 'Kigali Craft',
      regulatoryBody: 'RURA',
      validityPeriod: 'September 11th, 2024',
      verificationInformation: 'Checked'
    }
  },
  {
    id: 'identification',
    label: 'Identification of key persons',
    title: 'Identification of key persons confirmation',
    iconType: 'User',
    documents: {
      name: 'Kigali Craft',
      regulatoryBody: 'RURA',
      validityPeriod: 'September 11th, 2024',
      verificationInformation: 'Checked'
    }
  },
  {
    id: 'license',
    label: 'License of practice',
    title: 'License of practice confirmation',
    iconType: 'Scale',
    documents: {
      name: 'Kigali Craft',
      regulatoryBody: 'RURA',
      validityPeriod: 'September 11th, 2024',
      verificationInformation: 'Checked'
    }
  }
];

export default function KYCVerificationForm() {
  const [isClient, setIsClient] = useState(false);

  // Track current KYC step (0-3)
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(true);
  const [showError, setShowError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const router = useRouter()

  // Initialize form
  const {
    handleSubmit,
    setValue,
    watch,
    getValues
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      certificate: [],
      taxClearance: [],
      identification: [],
      license: []
    }
  });

  // Client-side hydration fix - Only run client-side code after hydration is complete
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Watch for file uploads
  const watchedFiles = {
    certificate: watch('certificate') || [],
    taxClearance: watch('taxClearance') || [],
    identification: watch('identification') || [],
    license: watch('license') || []
  };

  // Check if the current step has files
  const currentStepHasFiles = () => {
    const currentFieldId = KYC_STEPS[currentStep].id as keyof typeof watchedFiles;
    return watchedFiles[currentFieldId]?.length > 0;
  };

  // Clear error message when files are added
  useEffect(() => {
    if (currentStepHasFiles()) {
      setShowError(false);
    }
  }, [watchedFiles]);

  // Helper function to save document to database
  const saveDocumentToDatabase = async (fileUrl: string, fileName: string, documentType: string) => {
    try {
      const response = await axios.post('/api/kyc/documents', {
        documentType: DOCUMENT_TYPE_MAP[documentType as keyof typeof DOCUMENT_TYPE_MAP],
        fileUrl,
        fileName
      });

      return response.data.id; // Return the document ID
    } catch (error) {
      console.error('Error saving document:', error);
      throw error;
    }
  };

  // Next step with validation
  const nextStep = () => {
    if (!currentStepHasFiles()) {
      // Show error if trying to proceed without a file
      setShowError(true);
      return;
    }

    // Reset error state
    setShowError(false);

    if (currentStep < KYC_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowError(false); // Clear error when going back
    } else {
      // If on first step, show the preview
      setShowPreview(true);
    }
  };

  // Continue from preview to actual step 1
  const continueFromPreview = () => {
    setShowPreview(false);
  };

  // Handle file removal
  const handleRemoveFile = (index: number) => {
    const currentFieldId = KYC_STEPS[currentStep].id as keyof FormData;
    const currentFiles = getValues(currentFieldId) as any[] || [];
    const newFiles = currentFiles.filter((_, i) => i !== index);
    setValue(currentFieldId, newFiles);
  };

  // Form submission with validation
  const onSubmit = async (data: FormData) => {
    if (!currentStepHasFiles()) {
      setShowError(true);
      return;
    }

    try {
      setIsUploading(true);

      // Process all documents that don't have a document ID yet
      let allDocumentsSaved = true;

      for (const step of KYC_STEPS) {
        const stepId = step.id as keyof FormData;
        const docs = data[stepId] as any[] || [];

        // Save any unsaved documents
        for (let i = 0; i < docs.length; i++) {
          const doc = docs[i];
          if (!doc.documentId) {
            try {
              const documentId = await saveDocumentToDatabase(
                doc.fileUrl,
                doc.fileName,
                step.id
              );

              // Update the form data with the document ID
              docs[i] = { ...doc, documentId };
            } catch (error) {
              console.error(`Failed to save ${step.id} document:`, error);
              allDocumentsSaved = false;
            }
          }
        }

        // Update the form data
        setValue(stepId, docs);
      }

      setIsUploading(false);

      if (allDocumentsSaved) {
        toast({
          title: "KYC Submission Successful",
          description: "Your documents have been uploaded and will be reviewed.",
          variant: "success",
        });

        router.push('/dashboard');
      } else {
        toast({
          title: "Warning",
          description: "Some documents could not be saved. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsUploading(false);

      toast({
        title: "Error",
        description: "There was an error submitting your KYC documents.",
        variant: "destructive",
      });
    }
  };

  // Get the step indicator status for each step
  const getStepStatus = (index: number) => {
    if (index < currentStep) {
      return { completed: true };
    } else if (index === currentStep) {
      return { active: true };
    }
    return {};
  };

  return (
    <div className="flex flex-col w-full h-full bg-white">
      {/* Progress steps */}
      <div className="border-b border-gray-200 relative p-4">
        <div className="flex items-center justify-between mx-auto w-full px-4 max-w-5xl">
          {KYC_STEPS.map((step, index) => {
            const status = getStepStatus(index);
            return (
              <div key={step.id} className="flex items-center gap-2">
                <div className={`flex items-center justify-center
                  ${status.completed ? 'text-blue-600' :
                    status.active ? 'text-blue-600' : 'text-gray-400'}`}
                  suppressHydrationWarning
                >
                  {status.completed ? (
                    <CircleCheck
                      className="w-5 h-5"
                      suppressHydrationWarning
                    />
                  ) : (
                    <Circle className="w-5 h-5" suppressHydrationWarning />
                  )}
                </div>
                <span className={`text-sm font-medium
                  ${status.completed || status.active ? 'text-blue-600' : 'text-gray-400'}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
          {/* Progress bar - width based on current step */}
          <div className="absolute bottom-0 left-0 h-1 bg-blue-600 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / KYC_STEPS.length) * 100}%` }}>
          </div>
        </div>
      </div>

      {/* Main content */}
      {currentStep === 0 && showPreview ? (
        // Preview step (only for step 1)
        <div className="flex flex-grow">
          {/* Left column - Image and message (40% width) */}
          <div className="relative overflow-hidden w-2/5">
            <div className="relative h-full min-h-[600px] w-full">
              {isClient && (
                <Image
                  src="/images/login-trimmed.png"
                  alt="KYC Verification"
                  fill
                  priority
                  className="object-cover p-6"
                />
              )}
              <div className="absolute bottom-24 left-10 p-8 z-20 text-white">
                <h2 className="text-4xl font-bold mb-2">Congratulations !</h2>
                <h3 className="text-2xl font-semibold mb-4">You're almost here!</h3>
                <p className="text-base max-w-md">
                  To enable you to apply for loans, secure funding, and seek equity, we must first verify the legitimacy of your business.
                </p>
              </div>
            </div>
          </div>

          {/* Right column - Steps selection (60% width) */}
          <div className="bg-white p-8 w-3/5 flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-8 text-center">KYC verification</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto">
              {KYC_STEPS.map((step, index) => (
                <Card
                  key={step.id}
                  className={`border cursor-pointer hover:border-blue-500 transition-colors
                    ${index === 0 ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}
                >
                  <CardContent className="p-6 flex flex-col items-center justify-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 mt-3">
                      {step.iconType === 'Shield' && <Shield className="w-10 h-10" suppressHydrationWarning />}
                      {step.iconType === 'FileText' && <FileText className="w-10 h-10" suppressHydrationWarning />}
                      {step.iconType === 'User' && <User className="w-10 h-10" suppressHydrationWarning />}
                      {step.iconType === 'Scale' && <Scale className="w-10 h-10" suppressHydrationWarning />}
                    </div>
                    <span className="text-sm text-center font-medium">{step.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <Button
                onClick={continueFromPreview}
                className="px-10 py-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      ) : (
        // Document step pages
        <div className="flex flex-col md:flex-row h-full">
          {/* Left column - Document info in a single box */}
          <div className="md:w-2/5 h-full p-6">
            <div className="border border-blue-200 bg-gray-50 rounded-lg p-6 h-full">
              <div className="text-gray-500 text-lg mb-6">KYC Verification</div>

              <div className="mb-8">
                <h3 className="text-blue-600 mb-4 font-medium">The document must confirm</h3>
                <div className="grid grid-cols-2 gap-y-4 text-sm">
                  <div className="text-gray-500">Name</div>
                  <div className="font-medium">{KYC_STEPS[currentStep].documents.name}</div>

                  <div className="text-gray-500">Regulatory Body</div>
                  <div className="font-medium">{KYC_STEPS[currentStep].documents.regulatoryBody}</div>

                  <div className="text-gray-500">Validity period</div>
                  <div className="font-medium">{KYC_STEPS[currentStep].documents.validityPeriod}</div>

                  <div className="text-gray-500">Verification information</div>
                  <div className="font-medium">{KYC_STEPS[currentStep].documents.verificationInformation}</div>
                </div>
              </div>

              {/* Document requirements */}
              <div>
                <h3 className="text-blue-600 mb-4 font-medium">Document requirements</h3>
                <ul className="text-sm space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>File size should be up to 2MB</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>BMP, JPG, JPEG, PNG, or PDF format</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Issued within the last 3 months</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Contained the business name and address</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right column - File uploader */}
          <div className="md:w-3/5 p-8 flex flex-col justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full justify-center">
              <h2 className="text-2xl font-semibold text-blue-600 mb-6">
                {KYC_STEPS[currentStep].title}
              </h2>

              {/* Error message for validation */}
              {showError && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Please upload the required document before proceeding.
                  </AlertDescription>
                </Alert>
              )}

              {/* UploadThing dropzone - Only render on client side */}
              {isClient && watchedFiles[KYC_STEPS[currentStep].id as keyof typeof watchedFiles]?.length === 0 && (
                <div className={`rounded-lg p-6 bg-gray-50 h-64 transition-colors cursor-pointer
                  ${showError ? 'bg-red-50' : ''}`}
                >
                  <UploadDropzone
                    endpoint="kycDocumentUploader"
                    onClientUploadComplete={(res) => {
                      if (res && res.length > 0) {
                        const currentFieldId = KYC_STEPS[currentStep].id as keyof FormData;
                        const uploadedFiles = res.map(file => ({
                          fileUrl: file.url,
                          fileName: file.name
                        }));

                        setValue(currentFieldId, uploadedFiles as any);
                        setShowError(false);
                      }
                    }}
                    onUploadError={(error) => {
                      toast({
                        title: "Upload Error",
                        description: error.message || "Something went wrong during upload.",
                        variant: "destructive",
                      });
                    }}
                    className={`
                      ut-allowed-content:ut-mt-2 
                      ut-uploading:ut-text-blue-600
                      ut-label:ut-text-gray-700
                      ut-button:ut-bg-blue-600
                      ut-button:ut-text-white
                      border-2 border-dashed rounded-lg
                      px-4 py-8
                      h-full
                      flex flex-col items-center justify-center
                      text-center
                      ${showError ? 'border-red-500' : 'border-gray-300'}
                    `}
                  />
                </div>
              )}

              {/* File preview, show if files are selected - Only render on client side */}
              {isClient && watchedFiles[KYC_STEPS[currentStep].id as keyof typeof watchedFiles]?.length > 0 && (
                <div className="mt-6 bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-2">Uploaded files</h3>
                  <ul className="space-y-2">
                    {watchedFiles[KYC_STEPS[currentStep].id as keyof typeof watchedFiles].map((file: any, idx: number) => (
                      <li key={idx} className="flex items-center justify-between text-sm py-2 px-3 bg-white rounded border">
                        <span className="truncate max-w-xs">{file.fileName}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveFile(idx)}
                          className="text-red-500 hover:text-red-700 h-8 w-8"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>

                  {/* Button to upload another file */}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      // Clear current files to allow re-upload
                      const currentFieldId = KYC_STEPS[currentStep].id as keyof FormData;
                      setValue(currentFieldId, [] as any);
                    }}
                    className="mt-4 text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    Upload different file
                  </Button>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="px-10"
                  disabled={isUploading}
                >
                  Back
                </Button>

                {currentStep === KYC_STEPS.length - 1 ? (
                  <Button
                    type="submit"
                    className={`px-10 ${!currentStepHasFiles() || isUploading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                    disabled={!currentStepHasFiles() || isUploading}
                  >
                    {isUploading ? "Uploading..." : "Submit"}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className={`px-10 ${!currentStepHasFiles() ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                    disabled={!currentStepHasFiles() || isUploading}
                  >
                    Continue
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
