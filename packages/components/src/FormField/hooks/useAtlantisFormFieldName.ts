export function useAtlantisFormFieldName({
  id,
  nameProp,
}: {
  id: string;
  nameProp?: string;
}) {
  /**
   * Generate a name if one is not supplied, this is the name
   * that will be used for react-hook-form and not neccessarily
   * attached to the DOM
   */
  const name = nameProp ? nameProp : `generatedName--${id}`;

  return { name };
}
