export function saveToJson(fileName: string, data: object): void {
  const json = JSON.stringify(data, null, '\t');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
  a.download = `${fileName}.json`;
  a.click();
}
