"use client"

import { Button } from "@/components/ui/button"
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
      <header className="px-10 py-4 flex items-center">
        <Button className="ml-auto relative">
          test
        </Button>
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
                  <BreadcrumbItem>
                    <BreadcrumbPage className="capitalize">{link}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )
            } else if (index + 1 === listLink.length) {
              return (
                <BreadcrumbItem>
                  <BreadcrumbPage>{link}</BreadcrumbPage>
                </BreadcrumbItem>
              )
            }
            else {
              return (
                <>
                  <BreadcrumbItem>
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
