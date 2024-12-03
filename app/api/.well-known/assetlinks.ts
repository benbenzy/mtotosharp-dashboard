import type { NextApiRequest, NextApiResponse } from 'next'
const association=[
    {
      "relation": ["delegate_permission/common.handle_all_urls"],
      "target": {
        "namespace": "android_app",
        "package_name": "com.SIRH.mtotosharp",
        "sha256_cert_fingerprints":
          ["E6:E9:EF:1B:B0:9A:FB:43:51:BB:5E:94:37:0E:36:1F:9C:E1:D5:59:3A:81:ED:30:D3:42:6F:6F:EF:76:44:53"]
      }
    }
  ]
  export default (_: NextApiRequest, response: NextApiResponse) => {
    return response.status(200).send(association)
  }