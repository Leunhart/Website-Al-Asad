"use client";
import Link from "next/link";

export default function Home() {
  redirect("/landing/pendaftaran");
  return (
    <>
    <h1>test Feature</h1>
    <br/>
    <Link href="/admin/dashboard">Dashboard</Link>
    <br />
    <Link href="/admin/lomba">Lomba</Link>
    <br />
    <Link href="/admin/anggota">Anggota</Link>
    <br />
    <Link href="/admin/peralatan">Peralatan</Link>
    <br />
    <Link href="/admin/jadwal">Jadwal</Link>
    </>
);
}
