type SaveFileType = {
  description: string;
  accept: Record<string, string[]>;
};

const FILE_TYPES: Record<string, SaveFileType> = {
  pdf: {
    description: "PDF Document",
    accept: { "application/pdf": [".pdf"] },
  },
  html: {
    description: "HTML Document",
    accept: { "text/html": [".html"] },
  },
  json: {
    description: "JSON File",
    accept: { "application/json": [".json"] },
  },
  docx: {
    description: "Word Document",
    accept: {
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
  },
};

function extensionFromName(filename: string): string {
  const dot = filename.lastIndexOf(".");
  return dot >= 0 ? filename.slice(dot + 1).toLowerCase() : "";
}

function fallbackDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

/**
 * Prompt the user for a save location when supported (File System Access API),
 * otherwise fall back to the browser download behavior.
 */
export async function saveBlobAs(blob: Blob, suggestedName: string): Promise<boolean> {
  const ext = extensionFromName(suggestedName);
  const fileType = FILE_TYPES[ext];

  if ("showSaveFilePicker" in window && fileType) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName,
        types: [fileType],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return true;
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return false;
      }
    }
  }

  fallbackDownload(blob, suggestedName);
  return true;
}
