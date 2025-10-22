export const createApiResponse = <T>(
  success: boolean,
  data?: T,
  message?: string,
  error?: string,
  details?: any
) => {
  return {
    success,
    ...(data && { data }),
    ...(message && { message }),
    ...(error && { error }),
    ...(details && { details })
  };
};

export const createPaginatedResponse = <T>(
  data: T[],
  page: number,
  limit: number,
  total: number
) => {
  const pages = Math.ceil(total / limit);
  
  return {
    success: true,
    data,
    total,
    pagination: {
      page,
      limit,
      total,
      pages
    }
  };
};

export const sanitizeMongoObject = (obj: any): any => {
  if (!obj) return obj;
  
  if (Array.isArray(obj)) {
    return obj.map(sanitizeMongoObject);
  }
  
  if (typeof obj === 'object' && obj !== null) {
    const sanitized: any = {};
    
    for (const key in obj) {
      if (key === '_id') {
        sanitized.id = obj[key].toString();
      } else if (key === '__v') {
        continue;
      } else if (obj[key] && typeof obj[key] === 'object' && obj[key].toString) {
        sanitized[key] = obj[key].toString();
      } else {
        sanitized[key] = sanitizeMongoObject(obj[key]);
      }
    }
    
    return sanitized;
  }
  
  return obj;
};

export const generateRandomString = (length: number = 16): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return result;
};


export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};


export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};


export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};


export const pick = <T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  
  return result;
};

export const omit = <T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const result = { ...obj } as any;
  
  keys.forEach(key => {
    delete result[key];
  });
  
  return result;
};