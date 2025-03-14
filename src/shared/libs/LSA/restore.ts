export const deepObjectStructRestoreByReference = (reference: Record<string, any>, comparing: Record<string, any>) => {
  for (let key in reference) {
    if (comparing.hasOwnProperty(key)) {
      if (typeof reference[key] === 'object') {
        deepObjectStructRestoreByReference(reference[key], comparing[key]);
      }
    } else {
      comparing[key] = reference[key];
    }
  }
  return comparing;
};
