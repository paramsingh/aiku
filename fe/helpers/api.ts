import axios from 'axios';


export const getPoem = (
    word1: string,
    word2: string,
    handlePoem: (poem: string) => void,
    setLoading: (loading: boolean) => void
) => {
    axios.get(`https://aiku.param.codes/v1/haiku/${word1}/${word2}`).then(
        response => {
            const {haiku} = response.data;
            handlePoem(haiku);
            setLoading(false);
        }
    ).catch(err => {
        if (err.response.status == 400) {
            const {error} = err.response.data;
            if (error == 'unsafe_output') {
                const poem = `"Lovely Emily,
don't say those naughty words!" cried Alfred,
Who was appalled.`
                handlePoem(poem);
                setLoading(false);
            }
        } else {
            handlePoem("Something went wrong, aiku is hitting writer's block.")
            setLoading(false);
        }
    })
}
