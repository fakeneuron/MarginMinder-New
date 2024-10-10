export function handleImagePaste(e: React.ClipboardEvent, callback: (image: string) => void) {
  const items = e.clipboardData.items
  for (let i = 0; i < items.length; i++) {
    if (items[i].type.indexOf('image') !== -1) {
      const blob = items[i].getAsFile()
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          callback(event.target.result as string)
        }
      }
      reader.readAsDataURL(blob as Blob)
    }
  }
}