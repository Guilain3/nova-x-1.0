import { redirect } from "next/navigation";

export default function Home() {
  //redirect("/login");
  //redirect("./investor/dashboard");
  //redirect("./landing")
  redirect("./admin/dashboard")
}
