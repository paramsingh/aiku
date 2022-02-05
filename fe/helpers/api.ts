import axios from 'axios';


export const getPoem = (
    word1: string,
    word2: string,
    handlePoem: (poem: string) => void
) => {
    axios.get(`http://localhost:5000/v1/haiku/${word1}/${word2}`).then(
        response => {
            const {haiku} = response.data;
            handlePoem(haiku);
        }
    )
}
