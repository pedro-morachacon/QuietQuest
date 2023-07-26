"use client";
import FetchDataForm from "@/app/test/FetchDataForm";
import FirebaseUserDetails from "@/app/test/FirebaseUserDetails";
import LoginForm from "@/app/test/LoginForm";

export default function App() {
  return (
    <div>
      <h1>My App</h1>
        {/*<LoginForm/>*/}
      <FetchDataForm />
        <FirebaseUserDetails/>
    </div>
  );
}
