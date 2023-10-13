import openai
import re
from time import time, sleep
from uuid import uuid4
def open_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as infile:
        return infile.read()

def save_file(filepath, content):
    with open(filepath, 'w', encoding='utf-8') as outfile:
        outfile.write(content)

openai.api_key = open_file("openaiapikey.txt")

ages= ['Youth','Adult']
genders = ['Male','Female']
seasons = ['Summer','Winter']
styles = ['Ethnic','Minimalist']
places = ['Mumbai','Bengaluru']
themes = ['Formal','Cultural']
accessories =[ 'Watches','Sunglasses'] 

def gpt3_completion(prompt, engine='text-davinci-002', temp=1.0, top_p=1.0, tokens=1000, freq_pen=0.0,
                    pres_pen=0.0, stop=['asdfasdf', 'asdasdf']):
    max_retry = 5
    retry = 0
    prompt = prompt.encode(encoding='ASCII', errors='ignore').decode()
    
    while True:
        try:
            response = openai.Completion.create(
                engine=engine,
                prompt=prompt,
                temperature=temp,
                max_tokens=tokens,
                top_p=top_p,
                frequency_penalty=freq_pen,
                presence_penalty=pres_pen,
                stop=stop
            )
            text = response['choices'][0]['text'].strip()
            filename = '%s_gpt3.txt' % time()
            save_file('gpt3_logs/%s' % filename, prompt + '\n\n=======\n\n' + text)
            return text
        except Exception as oops:
            retry += 1
            if retry >= max_retry:
                return "GPT3 error: %s" % oops
            print('Error communicating with OpenAI:', oops)
            sleep(1)

if __name__ == '__main__':
    count = 0
    for age in ages:
        for gender in genders:
            for season in seasons:
                for style in styles:
                    for place in places:
                        for theme in themes:
                            for accessorie in accessories:
                                        count += 1
                                        prompt = open_file('prompt.txt')
                                        prompt = prompt.replace('<<AGE>>', age)
                                        prompt = prompt.replace('<<GENDER>>', gender)
                                        prompt = prompt.replace('<<SEASON>>', season)
                                        prompt = prompt.replace('<<STYLE>>', style)
                                        prompt = prompt.replace('<<PLACE>>', place)
                                        prompt = prompt.replace('<<THEME>>', theme)
                                        prompt = prompt.replace('<<ACCESSORIE>>', accessorie)
                                        prompt = prompt.replace('<<UUID>>', str(uuid4()))
                                        completion = gpt3_completion(prompt)
                                        outprompt = f'Age: {age}\nGender: {gender}\nSeason: {season}\nStyle: {style}\nPlace: {place}\nTheme: {theme}\nAccessories: {accessorie}\n\nScenario: {age}, {gender}, {season}, {style}, {place}, {theme}, {accessorie}'
                                        filename = f'{age}{gender}{season}{style}{place}{theme}_{accessorie}.txt'.replace(' ', '').replace('&', '')
                                        save_file('prompts/%s' % filename, outprompt)
                                        save_file('completions/%s' % filename, completion)

                                        print('\n\n', outprompt)
                                        print('\n\n', completion)

                                        if count > 500:
                                            exit()