import openai
from aiku.config import OPENAI_SECRET_KEY


def generate_haiku(theme1, theme2):
    """
    Generates a haiku based on the themes.
    """
    completion = openai.Completion.create(
        engine="davinci",
        prompt="""
A haiku is a poem containing (in English) a total of 17 syllables shared between three lines that are arranged in a pattern of 5-7-5. The fist line consists of 5 syllables, the second line 7, and the last line contains another 5 syllables.

Write a haiku containing the two words in the input.

Input: autumn, father
Haiku:
First autumn morning:
the mirror I stare into
shows my father's face.

Input: snowdrops, glory
Haiku:
Delightful display
Snowdrops bow their pure white heads
To the sun's glory.

Input: silent, frog
Haiku:
An old silent pond...
A frog jumps into the pond,
splash! Silence again.

Input: autumn, travels
Haiku:
No one travels
Along this way but I,
This autumn evening.

Input: {}, {}
Haiku:""".format(
            theme1,
            theme2,
        ),
        max_tokens=22,
        temperature=0.95,
    )
    lines = completion.choices[0].text.split("\n")[1:4]
    return '\n'.join(lines)


if __name__ == "__main__":
    openai.api_key = OPENAI_SECRET_KEY
    print("Chess, loss")
    print(generate_haiku("chess", "loss"))
    print("================================")
