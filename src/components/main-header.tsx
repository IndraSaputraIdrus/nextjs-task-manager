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


export default function MainHeader() {

  const router = usePathname()
  const listLink = router.split('/').filter((link => link))

  return (
    <>
      <header className="px-10 py-4 flex items-center justify-end">
        <LogoutButton />
      </header>

      <Breadcrumb className="px-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="capitalize" asChild>
              <Link href="/">home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {listLink.map((link, index) => {
            if (listLink.length === 1) {
              return (
                <>
                  <BreadcrumbItem key={index}>
                    <BreadcrumbPage className="capitalize">{link}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )
            } else if (index + 1 === listLink.length) {
              return (
                <BreadcrumbItem key={index}>
                  <BreadcrumbPage>{link}</BreadcrumbPage>
                </BreadcrumbItem>
              )
            }
            else {
              return (
                <>
                  <BreadcrumbItem key={index}>
                    <BreadcrumbLink className="capitalize" asChild>
                      <Link href={`/${link}`}>{link}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              )
            }
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  )
}
