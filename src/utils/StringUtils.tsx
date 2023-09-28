function getIdFromUrl(url: string): string {
  const urlInArray = url.split('/');
  const id = urlInArray[urlInArray.length - 2];
  return id;
}

function getOffsetFromUrl(urlString: string) {
  const parts = urlString.split('?');
  const queryParams = parts[1].split('&');
  let offset = '',
    limit = '';

  for (let i = 0; i < queryParams.length; i++) {
    let param = queryParams[i].split('=');

    if (param[0] === 'offset') {
      offset = param[1];
    } else if (param[0] === 'limit') {
      limit = param[1];
    }
  }

  return {
    offset,
    limit,
  };
}

const StringUtils = {getIdFromUrl, getOffsetFromUrl};

export default StringUtils;
