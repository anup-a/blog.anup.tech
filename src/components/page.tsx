import * as React from "react"

type Props = {
  data: {
    page: {
      title: string
      slug: string
      excerpt: string
      body: string
    }
  }
  [key: string]: any
}

export default function BlogPage({ ...props }: Props) {
  return <div>Page</div>
}
