import axios from 'axios';


export const getPoem = (
    word1: string,
    word2: string,
    handlePoem: (poem: string) => void,
    setLoading: (loading: boolean) => void
) => {
    console.log(word1, word2);
    axios.get(`https://aiku.param.codes/v1/haiku/${word1}/${word2}`).then(
        response => {
            const {haiku} = response.data;
            handlePoem(haiku);
            setLoading(false);
        }
    )
}
