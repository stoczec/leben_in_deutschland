export const LAND_NAMES = {
  SH: 'Schleswig-Holstein',
};

export const landName = (code) => LAND_NAMES[code] || code;
