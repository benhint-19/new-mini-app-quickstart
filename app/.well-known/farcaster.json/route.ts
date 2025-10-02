import { minikitConfig } from "../../../minikit.config";

export async function GET() {
  // Explicitly structure the manifest to ensure baseBuilder is included
  const manifest = {
    accountAssociation: minikitConfig.accountAssociation,
    baseBuilder: {
      allowedAddresses: ["0x80362593e356acce02CA6BE5324449b3c677E66e"]
    },
    miniapp: minikitConfig.miniapp
  };
  
  return Response.json(manifest, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
