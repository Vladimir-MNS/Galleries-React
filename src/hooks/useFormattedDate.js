import { parseISO, format } from 'date-fns';

const useFormattedDate = (str, outputFormat = 'yyyy-MM-dd HH:mm:ss') => {
    const parsedDate = parseISO(str)
    const formattedDate = format(parsedDate, outputFormat);
    return formattedDate;
};

export default useFormattedDate;