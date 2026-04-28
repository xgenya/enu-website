import nextra from 'nextra'

const withNextra = nextra({
  search: true,
  defaultShowCopyCode: true,
})

export default withNextra({
  output: 'standalone',
  async headers() {
    return [
      {
        source: '/((?!api|_next/static|_next/image|images|favicon.ico|robots.txt|sitemap.xml).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0, must-revalidate',
          },
        ],
      },
    ]
  },
})
