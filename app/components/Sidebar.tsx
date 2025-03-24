import Link from "next/link";
import Stat from "@/app/components/Stat";

export default function Sidebar() {
  return (
    <div className="w-64 fixed left-0 top-0 bottom-0 bg-base-200 text-white p-4 flex flex-col">
      <div className="flex flex-col justify-center items-center mb-2">
        <h2 className="text-2xl font-bold">Organigrama</h2>
        <div className="w-full flex flex-col justify-center items-left">
          <Stat title="username" value="nombre" />
        </div>
      </div>
      <nav className="flex-1">
        <ul className="menu bg-base-200 rounded-box w-56">
          <li>
            <details open>
              <summary>Organigramas</summary>
              <ul>
                <li>
                  <Link href={"/organigrama/1"}>organigrama 1</Link>
                </li>
                <li><a>Submenu 2</a></li>
                <li>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </nav>
      <footer className="mt-6">
        <p className="text-sm text-gray-400">© 2023 Organigrama</p>
      </footer>
    </div>
  );
}