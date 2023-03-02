import openai
from aiku.errors import UnsafeOutput
from aiku.config import OPENAI_SECRET_KEY


UNSAFE_OUTPUT_RETRIES = 3


def generate_haiku(theme1, theme2, user=None):
    """
    Generates a haiku based on the themes.
    """
    for _ in range(UNSAFE_OUTPUT_RETRIES):
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system",
                    "content": "A haiku is a poem containing (in English) a total of 17 syllables shared between three lines that are arranged in a pattern of 5-7-5. The fist line consists of 5 syllables, the second line 7, and the last line contains another 5 syllables."},
                {"role": "system", "content": "Write a haiku based on the two words the user gives you."},
                {"role": "system", "content": "Also, DO NOT output anything after you've written your haiku."},
                {"role": "user", "content": "autumn, father"},
                {"role": "assistant", "content": "First autumn morning:\nthe mirror I stare into\nshows my father's face."},
                {"role": "user", "content": "snowdrops, glory"},
                {"role": "assistant", "content": "Delightful display\nSnowdrops bow their pure white heads\nTo the sun's glory."},
                {"role": "user", "content": "silent, frog"},
                {"role": "assistant", "content": "An old silent pond...\nA frog jumps into the pond,\nsplash! Silence again."},
                {"role": "user", "content": "autumn, travels"},
                {"role": "assistant",
                    "content": "No one travels\nAlong this way but I,\nThis autumn evening."},
                {"role": "user", "content": f"{theme1}, {theme2}"},

            ]
        )
        content = completion.choices[0]["message"]["content"]
        if filter(content) != '2':
            return content.strip()
    raise UnsafeOutput


def filter(content: str):
    response = openai.Completion.create(
        engine="content-filter-alpha",
        prompt="<|endoftext|>"+content+"\n--\nLabel:",
        temperature=0,
        max_tokens=1,
        top_p=0,
        logprobs=10
    )
    output_label = response["choices"][0]["text"]

    # This is the probability at which we evaluate that a "2" is likely real
    # vs. should be discarded as a false positive
    toxic_threshold = -0.355

    if output_label == "2":
        # If the model returns "2", return its confidence in 2 or other output-labels
        logprobs = response["choices"][0]["logprobs"]["top_logprobs"][0]

        # If the model is not sufficiently confident in "2",
        # choose the most probable of "0" or "1"
        # Guaranteed to have a confidence for 2 since this was the selected token.
        if logprobs["2"] < toxic_threshold:
            logprob_0 = logprobs.get("0", None)
            logprob_1 = logprobs.get("1", None)

            # If both "0" and "1" have probabilities, set the output label
            # to whichever is most probable
            if logprob_0 is not None and logprob_1 is not None:
                if logprob_0 >= logprob_1:
                    output_label = "0"
                else:
                    output_label = "1"
            # If only one of them is found, set output label to that one
            elif logprob_0 is not None:
                output_label = "0"
            elif logprob_1 is not None:
                output_label = "1"

            # If neither "0" or "1" are available, stick with "2"
            # by leaving output_label unchanged.

    # if the most probable token is none of "0", "1", or "2"
    # this should be set as unsafe
    if output_label not in ["0", "1", "2"]:
        output_label = "2"

    return output_label


if __name__ == "__main__":
    openai.api_key = OPENAI_SECRET_KEY
    print("Chess, loss")
    print(generate_haiku("chess", "loss"))
    print("================================")
