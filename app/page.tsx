import Link from "next/link";

export default function Home() {
  return (
    <>
    <h1>Testing bang</h1>
    <br/>
    <Link href="/dashboard">Dashboard</Link>
    <br />
    <Link href="/lomba">Lomba</Link>
    <br />
    <Link href="/anggota">Anggota</Link>
    </>
);
}
 