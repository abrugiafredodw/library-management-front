
export function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

export function stringAvatar(name: string): { sx: { bgcolor: string }, children: string } {
  const words = name.split(' ');
  let children = '';
  if (words.length >= 2) {
    children = `${words[0][0]}${words[1][0]}`;
  } else if (words.length === 1 && words[0].length > 0) {
    children = `${words[0][0]}`;
  }
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children,
  };
}