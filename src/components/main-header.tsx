"use client"

import LogoutButton from "@/components/logout-button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Fragment } from "react";


export default function MainHeader() {
  const router = usePathname()
  const listLink = router.split('/').filter(link => link)

  return (
    <>
      <header className="px-10 py-4 flex items-center justify-end">
        <LogoutButton />
      </header>

      <Breadcrumb className="px-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {listLink.map((link, index) => (
              <Fragment key={link}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={`/${listLink.slice(0, index + 1).join("/")}`}>{link}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {(index + 1) === listLink.length ? null : <BreadcrumbSeparator />}
              </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  )
}
