function getIdFromUrl(url: string): string {
  const urlInArray = url.split('/');
  const id = urlInArray[urlInArray.length - 2];
  return id;
}

const StringUtils = {getIdFromUrl};

export default StringUtils;
