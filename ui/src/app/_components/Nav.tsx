"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="p-4 absolute top-0 z-20 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl uppercase font-bold text-blue-300">
          Phish Aware
        </Link>
        <div className="flex flex-nowrap gap-0 md:gap-4 lg:gap-8">
          <Button
            variant="ghost"
            size={"default"}
            asChild
            className={cn(
              "uppercase text-slate-300",
              pathname == "/about" && "text-cyan-200"
            )}
          >
            <Link href="/about">À propos</Link>
          </Button>
          <Button
            variant="ghost"
            size={"default"}
            asChild
            className={cn(
              "uppercase text-slate-300",
              pathname == "/guide" && "text-cyan-200"
            )}
          >
            <Link href="/guide">Guide</Link>
          </Button>
          <Button
            variant="ghost"
            size={"default"}
            asChild
            className={cn(
              "uppercase text-slate-300",
              pathname == "/contact" && "text-cyan-200"
            )}
          >
            <Link href="/contact">Contact</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
