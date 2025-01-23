import NextImage from "next/image"

export function Image(props: React.ComponentPropsWithoutRef<typeof NextImage>) {
  return <NextImage {...props} />
}