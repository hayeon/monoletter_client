"use client";
import Navbar from "./Navbar";
import "../../styles/reset.css"


export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
