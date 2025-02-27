/* eslint-disable no-control-regex */
import { languages } from './languages'

export default function guessLanguage() {
    const models: Record<string, string> = languages

    const MAX_LENGTH = 4096
    const MIN_LENGTH = 20
    const MAX_GRAMS = 300

    const NAME_MAP: Record<string, string> = {
        'ab': 'Abkhazian',
        'af': 'Afrikaans',
        'ar': 'Arabic',
        'az': 'Azeri',
        'be': 'Belarusian',
        'bg': 'Bulgarian',
        'bn': 'Bengali',
        'bo': 'Tibetan',
        'br': 'Breton',
        'ca': 'Catalan',
        'ceb': 'Cebuano',
        'cs': 'Czech',
        'cy': 'Welsh',
        'da': 'Danish',
        'de': 'German',
        'el': 'Greek',
        'en': 'English',
        'eo': 'Esperanto',
        'es': 'Spanish',
        'et': 'Estonian',
        'eu': 'Basque',
        'fa': 'Farsi',
        'fi': 'Finnish',
        'fo': 'Faroese',
        'fr': 'French',
        'fy': 'Frisian',
        'gd': 'Scots Gaelic',
        'gl': 'Galician',
        'gu': 'Gujarati',
        'ha': 'Hausa',
        'haw': 'Hawaiian',
        'he': 'Hebrew',
        'hi': 'Hindi',
        'hmn': 'Pahawh Hmong',
        'hr': 'Croatian',
        'hu': 'Hungarian',
        'hy': 'Armenian',
        'id': 'Indonesian',
        'is': 'Icelandic',
        'it': 'Italian',
        'ja': 'Japanese',
        'ka': 'Georgian',
        'kk': 'Kazakh',
        'km': 'Cambodian',
        'ko': 'Korean',
        'ku': 'Kurdish',
        'ky': 'Kyrgyz',
        'la': 'Latin',
        'lt': 'Lithuanian',
        'lv': 'Latvian',
        'mg': 'Malagasy',
        'mk': 'Macedonian',
        'ml': 'Malayalam',
        'mn': 'Mongolian',
        'mr': 'Marathi',
        'ms': 'Malay',
        'nd': 'Ndebele',
        'ne': 'Nepali',
        'nl': 'Dutch',
        'nn': 'Nynorsk',
        'no': 'Norwegian',
        'nso': 'Sepedi',
        'pa': 'Punjabi',
        'pl': 'Polish',
        'ps': 'Pashto',
        'pt': 'Portuguese',
        'pt-PT': 'Portuguese (Portugal)',
        'pt-BR': 'Portuguese (Brazil)',
        'ro': 'Romanian',
        'ru': 'Russian',
        'sa': 'Sanskrit',
        'bs': 'Serbo-Croatian',
        'sk': 'Slovak',
        'sl': 'Slovene',
        'so': 'Somali',
        'sq': 'Albanian',
        'sr': 'Serbian',
        'sv': 'Swedish',
        'sw': 'Swahili',
        'ta': 'Tamil',
        'te': 'Telugu',
        'th': 'Thai',
        'tl': 'Tagalog',
        'tlh': 'Klingon',
        'tn': 'Setswana',
        'tr': 'Turkish',
        'ts': 'Tsonga',
        'tw': 'Twi',
        'uk': 'Ukrainian',
        'ur': 'Urdu',
        'uz': 'Uzbek',
        've': 'Venda',
        'vi': 'Vietnamese',
        'xh': 'Xhosa',
        'zh': 'Chinese',
        'zh-TW': 'Traditional Chinese (Taiwan)',
        'zu': 'Zulu',
    }

    const IANA_MAP: Record<string, number> = {
        'ab': 12026,
        'af': 40,
        'ar': 26020,
        'az': 26030,
        'be': 11890,
        'bg': 26050,
        'bn': 26040,
        'bo': 26601,
        'br': 1361,
        'ca': 3,
        'ceb': 26060,
        'cs': 26080,
        'cy': 26560,
        'da': 26090,
        'de': 26160,
        'el': 26165,
        'en': 26110,
        'eo': 11933,
        'es': 26460,
        'et': 26120,
        'eu': 1232,
        'fa': 26130,
        'fi': 26140,
        'fo': 11817,
        'fr': 26150,
        'fy': 1353,
        'gd': 65555,
        'gl': 1252,
        'gu': 26599,
        'ha': 26170,
        'haw': 26180,
        'he': 26592,
        'hi': 26190,
        'hr': 26070,
        'hu': 26200,
        'hy': 26597,
        'id': 26220,
        'is': 26210,
        'it': 26230,
        'ja': 26235,
        'ka': 26600,
        'kk': 26240,
        'km': 1222,
        'ko': 26255,
        'ku': 11815,
        'ky': 26260,
        'la': 26280,
        'lt': 26300,
        'lv': 26290,
        'mg': 1362,
        'mk': 26310,
        'ml': 26598,
        'mn': 26320,
        'mr': 1201,
        'ms': 1147,
        'ne': 26330,
        'nl': 26100,
        'nn': 172,
        'no': 26340,
        'pa': 65550,
        'pl': 26380,
        'ps': 26350,
        'pt': 26390,
        'ro': 26400,
        'ru': 26410,
        'sa': 1500,
        'bs': 1399,
        'sk': 26430,
        'sl': 26440,
        'so': 26450,
        'sq': 26010,
        'sr': 26420,
        'sv': 26480,
        'sw': 26470,
        'ta': 26595,
        'te': 26596,
        'th': 26594,
        'tl': 26490,
        'tlh': 26250,
        'tn': 65578,
        'tr': 26500,
        'tw': 1499,
        'uk': 26520,
        'ur': 26530,
        'uz': 26540,
        'vi': 26550,
        'zh': 26065,
        'zh-TW': 22,
    }

    const SINGLETONS = [
        ['Armenian', 'hy'],
        ['Hebrew', 'he'],
        ['Bengali', 'bn'],
        ['Gurmukhi', 'pa'],
        ['Greek', 'el'],
        ['Gujarati', 'gu'],
        ['Oriya', 'or'],
        ['Tamil', 'ta'],
        ['Telugu', 'te'],
        ['Kannada', 'kn'],
        ['Malayalam', 'ml'],
        ['Sinhala', 'si'],
        ['Thai', 'th'],
        ['Lao', 'lo'],
        ['Tibetan', 'bo'],
        ['Burmese', 'my'],
        ['Georgian', 'ka'],
        ['Mongolian', 'mn'],
        ['Khmer', 'km'],
        ['Pahawh Hmong', 'hmn'],
    ]

    const UNKNOWN = 'unknown'

    const BASIC_LATIN = [
        'en',
        'ceb',
        'ha',
        'so',
        'tlh',
        'id',
        'haw',
        'la',
        'sw',
        'eu',
        'nr',
        'nso',
        'zu',
        'xh',
        'ss',
        'st',
        'tn',
        'ts',
    ]
    const EXTENDED_LATIN = [
        'cs',
        'af',
        'pl',
        'hr',
        'ro',
        'sk',
        'sl',
        'tr',
        'hu',
        'az',
        'et',
        'sq',
        'ca',
        'es',
        'fr',
        'de',
        'nl',
        'it',
        'da',
        'is',
        'no',
        'sv',
        'fi',
        'lv',
        'pt',
        've',
        'lt',
        'tl',
        'cy',
        'vi',
    ]
    const ALL_LATIN = BASIC_LATIN.concat(EXTENDED_LATIN)
    const CYRILLIC = ['ru', 'uk', 'kk', 'uz', 'mn', 'sr', 'mk', 'bg', 'ky']
    const ARABIC = ['ar', 'fa', 'ps', 'ur']
    const DEVANAGARI = ['hi', 'ne']
    const PT = ['pt-BR', 'pt-PT']

    // Unicode char greedy regex block range matchers
    const unicodeBlockTests: Record<string, RegExp> = {
        'Basic Latin': /[\u0000-\u007F]/g,
        'Latin-1 Supplement': /[\u0080-\u00FF]/g,
        'Latin Extended-A': /[\u0100-\u017F]/g,
        'Latin Extended-B': /[\u0180-\u024F]/g,
        'IPA Extensions': /[\u0250-\u02AF]/g,
        'Spacing Modifier Letters': /[\u02B0-\u02FF]/g,
        'Combining Diacritical Marks': /[\u0300-\u036F]/g,
        'Greek and Coptic': /[\u0370-\u03FF]/g,
        'Cyrillic': /[\u0400-\u04FF]/g,
        'Cyrillic Supplement': /[\u0500-\u052F]/g,
        'Armenian': /[\u0530-\u058F]/g,
        'Hebrew': /[\u0590-\u05FF]/g,
        'Arabic': /[\u0600-\u06FF]/g,
        'Syriac': /[\u0700-\u074F]/g,
        'Arabic Supplement': /[\u0750-\u077F]/g,
        'Thaana': /[\u0780-\u07BF]/g,
        'NKo': /[\u07C0-\u07FF]/g,
        'Devanagari': /[\u0900-\u097F]/g,
        'Bengali': /[\u0980-\u09FF]/g,
        'Gurmukhi': /[\u0A00-\u0A7F]/g,
        'Gujarati': /[\u0A80-\u0AFF]/g,
        'Oriya': /[\u0B00-\u0B7F]/g,
        'Tamil': /[\u0B80-\u0BFF]/g,
        'Telugu': /[\u0C00-\u0C7F]/g,
        'Kannada': /[\u0C80-\u0CFF]/g,
        'Malayalam': /[\u0D00-\u0D7F]/g,
        'Sinhala': /[\u0D80-\u0DFF]/g,
        'Thai': /[\u0E00-\u0E7F]/g,
        'Lao': /[\u0E80-\u0EFF]/g,
        'Tibetan': /[\u0F00-\u0FFF]/g,
        'Burmese': /[\u1000-\u109F]/g,
        'Georgian': /[\u10A0-\u10FF]/g,
        'Hangul Jamo': /[\u1100-\u11FF]/g,
        'Ethiopic': /[\u1200-\u137F]/g,
        'Ethiopic Supplement': /[\u1380-\u139F]/g,
        'Cherokee': /[\u13A0-\u13FF]/g,
        'Unified Canadian Aboriginal Syllabics': /[\u1400-\u167F]/g,
        'Ogham': /[\u1680-\u169F]/g,
        'Runic': /[\u16A0-\u16FF]/g,
        'Pahawh Hmong': /[\u16B0-\u16B8]/g,
        'Tagalog': /[\u1700-\u171F]/g,
        'Hanunoo': /[\u1720-\u173F]/g,
        'Buhid': /[\u1740-\u175F]/g,
        'Tagbanwa': /[\u1760-\u177F]/g,
        'Khmer': /[\u1780-\u17FF]/g,
        'Mongolian': /[\u1800-\u18AF]/g,
        'Limbu': /[\u1900-\u194F]/g,
        'Tai Le': /[\u1950-\u197F]/g,
        'New Tai Lue': /[\u1980-\u19DF]/g,
        'Khmer Symbols': /[\u19E0-\u19FF]/g,
        'Buginese': /[\u1A00-\u1A1F]/g,
        'Balinese': /[\u1B00-\u1B7F]/g,
        'Phonetic Extensions': /[\u1D00-\u1D7F]/g,
        'Phonetic Extensions Supplement': /[\u1D80-\u1DBF]/g,
        'Combining Diacritical Marks Supplement': /[\u1DC0-\u1DFF]/g,
        'Latin Extended Additional': /[\u1E00-\u1EFF]/g,
        'Greek Extended': /[\u1F00-\u1FFF]/g,
        'General Punctuation': /[\u2000-\u206F]/g,
        'Superscripts and Subscripts': /[\u2070-\u209F]/g,
        'Currency Symbols': /[\u20A0-\u20CF]/g,
        'Combining Diacritical Marks for Symbols': /[\u20D0-\u20FF]/g,
        'Letterlike Symbols': /[\u2100-\u214F]/g,
        'Number Forms': /[\u2150-\u218F]/g,
        'Arrows': /[\u2190-\u21FF]/g,
        'Mathematical Operators': /[\u2200-\u22FF]/g,
        'Miscellaneous Technical': /[\u2300-\u23FF]/g,
        'Control Pictures': /[\u2400-\u243F]/g,
        'Optical Character Recognition': /[\u2440-\u245F]/g,
        'Enclosed Alphanumerics': /[\u2460-\u24FF]/g,
        'Box Drawing': /[\u2500-\u257F]/g,
        'Block Elements': /[\u2580-\u259F]/g,
        'Geometric Shapes': /[\u25A0-\u25FF]/g,
        'Miscellaneous Symbols': /[\u2600-\u26FF]/g,
        'Dingbats': /[\u2700-\u27BF]/g,
        'Miscellaneous Mathematical Symbols-A': /[\u27C0-\u27EF]/g,
        'Supplemental Arrows-A': /[\u27F0-\u27FF]/g,
        'Braille Patterns': /[\u2800-\u28FF]/g,
        'Supplemental Arrows-B': /[\u2900-\u297F]/g,
        'Miscellaneous Mathematical Symbols-B': /[\u2980-\u29FF]/g,
        'Supplemental Mathematical Operators': /[\u2A00-\u2AFF]/g,
        'Miscellaneous Symbols and Arrows': /[\u2B00-\u2BFF]/g,
        'Glagolitic': /[\u2C00-\u2C5F]/g,
        'Latin Extended-C': /[\u2C60-\u2C7F]/g,
        'Coptic': /[\u2C80-\u2CFF]/g,
        'Georgian Supplement': /[\u2D00-\u2D2F]/g,
        'Tifinagh': /[\u2D30-\u2D7F]/g,
        'Ethiopic Extended': /[\u2D80-\u2DDF]/g,
        'Supplemental Punctuation': /[\u2E00-\u2E7F]/g,
        'CJK Radicals Supplement': /[\u2E80-\u2EFF]/g,
        'KangXi Radicals': /[\u2F00-\u2FDF]/g,
        'Ideographic Description Characters': /[\u2FF0-\u2FFF]/g,
        'CJK Symbols and Punctuation': /[\u3000-\u303F]/g,
        'Hiragana': /[\u3040-\u309F]/g,
        'Katakana': /[\u30A0-\u30FF]/g,
        'Bopomofo': /[\u3100-\u312F]/g,
        'Hangul Compatibility Jamo': /[\u3130-\u318F]/g,
        'Kanbun': /[\u3190-\u319F]/g,
        'Bopomofo Extended': /[\u31A0-\u31BF]/g,
        'CJK Strokes': /[\u31C0-\u31EF]/g,
        'Katakana Phonetic Extensions': /[\u31F0-\u31FF]/g,
        'Enclosed CJK Letters and Months': /[\u3200-\u32FF]/g,
        'CJK Compatibility': /[\u3300-\u33FF]/g,
        'CJK Unified Ideographs Extension A': /[\u3400-\u4DBF]/g,
        'Yijing Hexagram Symbols': /[\u4DC0-\u4DFF]/g,
        'CJK Unified Ideographs': /[\u4E00-\u9FFF]/g,
        'Yi Syllables': /[\uA000-\uA48F]/g,
        'Yi Radicals': /[\uA490-\uA4CF]/g,
        'Modifier Tone Letters': /[\uA700-\uA71F]/g,
        'Latin Extended-D': /[\uA720-\uA7FF]/g,
        'Syloti Nagri': /[\uA800-\uA82F]/g,
        'Phags-pa': /[\uA840-\uA87F]/g,
        'Hangul Syllables': /[\uAC00-\uD7AF]/g,
        'High Surrogates': /[\uD800-\uDB7F]/g,
        'High Private Use Surrogates': /[\uDB80-\uDBFF]/g,
        'Low Surrogates': /[\uDC00-\uDFFF]/g,
        'Private Use Area': /[\uE000-\uF8FF]/g,
        'CJK Compatibility Ideographs': /[\uF900-\uFAFF]/g,
        'Alphabetic Presentation Forms': /[\uFB00-\uFB4F]/g,
        'Arabic Presentation Forms-A': /[\uFB50-\uFDFF]/g,
        'Variation Selectors': /[\uFE00-\uFE0F]/g,
        'Vertical Forms': /[\uFE10-\uFE1F]/g,
        'Combining Half Marks': /[\uFE20-\uFE2F]/g,
        'CJK Compatibility Forms': /[\uFE30-\uFE4F]/g,
        'Small Form Variants': /[\uFE50-\uFE6F]/g,
        'Arabic Presentation Forms-B': /[\uFE70-\uFEFF]/g,
        'Halfwidth and Fullwidth Forms': /[\uFF00-\uFFEF]/g,
        'Specials': /[\uFFF0-\uFFFF]/g,
    }

    function findRuns(text: string) {
        const relevantRuns: Record<string, number> = {}

        for (const key in unicodeBlockTests) {
            // Count the number of characters in each character block.
            const charCount = text.match(unicodeBlockTests[key])

            // return run types that used for 40% or more of the string
            // always return basic latin if found more than 15%
            // and extended additional latin if over 10% (for Vietnamese)
            const pct = (charCount ? charCount.length : 0) / text.length

            relevantRuns[key] = pct
        }

        return relevantRuns
    }

    async function identify(text: string): Promise<string> {
        const scripts = findRuns(text)

        // Identify the language.
        if (scripts['Hangul Syllables'] + scripts['Hangul Jamo'] + scripts['Hangul Compatibility Jamo'] >= 0.4) {
            return 'ko'
        }

        if (scripts['Greek and Coptic'] >= 0.4) {
            return 'el'
        }

        if (scripts['Hiragana'] + scripts['Katakana'] + scripts['Katakana Phonetic Extensions'] >= 0.2) {
            return 'ja'
        }

        if (
            scripts['CJK Unified Ideographs'] +
                scripts['Bopomofo'] +
                scripts['Bopomofo Extended'] +
                scripts['KangXi Radicals'] >=
            0.4
        ) {
            return 'zh'
        }

        if (scripts['Cyrillic'] >= 0.4) {
            return await check(text, CYRILLIC)
        }

        if (
            scripts['Arabic'] + scripts['Arabic Presentation Forms-A'] + scripts['Arabic Presentation Forms-B'] >=
            0.4
        ) {
            return await check(text, ARABIC)
        }

        if (scripts['Devanagari'] >= 0.4) {
            return await check(text, DEVANAGARI)
        }

        // Try languages with unique scripts
        for (let i = 0, l = SINGLETONS.length; i < l; i++) {
            if (scripts[SINGLETONS[i][0]] >= 0.4) {
                return SINGLETONS[i][1]
            }
        }

        // Extended Latin
        if (scripts['Latin-1 Supplement'] + scripts['Latin Extended-A'] + scripts['IPA Extensions'] >= 0.4) {
            const latinLang = await check(text, EXTENDED_LATIN)
            if (latinLang == 'pt') {
                return await check(text, PT)
            }
            return latinLang
        }

        if (scripts['Basic Latin'] >= 0.15) {
            return await check(text, ALL_LATIN)
        }

        return UNKNOWN
    }

    async function check(sample: string, langs: string[]): Promise<string> {
        if (sample.length < MIN_LENGTH) {
            return UNKNOWN
        }

        const scores: Record<string, number> = {}
        const model = createOrderedModel(sample)
        for (let i = 0, l = langs.length; i < l; i++) {
            const lkey = langs[i].toLowerCase()

            const knownModel = createKnownModel(lkey) || null

            if (!knownModel) {
                continue
            }

            scores[lkey] = distance(model, knownModel)
        }

        const scoresArr = []
        for (const index in scores) {
            scoresArr.push([index, scores[index]])
        }

        if (scoresArr.length == 0) {
            return UNKNOWN
        }

        // we want the lowest score, less distance = greater chance of match
        const sortedScores = scoresArr.sort(function(objA: any, objB: any) {
            return objA[1] - objB[1] // sort low-to-high
        })

        // return the best match we've now calculated
        return sortedScores[0][0] as string
    }

    function createOrderedModel(content_: string) {
        // Create a list of trigrams in content sorted by frequency.
        const trigrams: Record<string, number> = {},
            sortedTrigrams: [number | string, number][] = []
        const content = content_.toLowerCase()

        const contentArr = content.split('')
        for (let i = 0, l = contentArr.length - 2; i < l; i++) {
            const trigramKey = contentArr[i] + contentArr[i + 1] + contentArr[i + 2] + ''
            if (!trigrams[trigramKey]) {
                trigrams[trigramKey] = 1
            } else {
                trigrams[trigramKey] += 1
            }
        }

        // convert object to array
        for (const i in trigrams) {
            sortedTrigrams[sortedTrigrams.length] = [i, trigrams[i]]
        }

        // sort array results
        return sortedTrigrams.sort(function(objA, objB) {
            return objB[1] - objA[1] // sort high-to-low
        })
    }

    const knownModelCache: Record<string, Record<string, number>> = {}

    function createKnownModel(key: string) {
        // Check if known model has been pre-computed in cache
        if (knownModelCache[key]) {
            return knownModelCache[key]
        }

        const data = models[key]
        if (!data) {
            return {}
        }

        // Extract known trigram model data
        const dataArr = data.match(/([\s\S]{1,3})/g)
        if (!dataArr) {
            return {}
        }
        // Contruct known trigram object based on provided raw data
        const knownModel: Record<string, number> = {}
        for (let i = 0, l = dataArr.length; i < l; i++) {
            knownModel[dataArr[i]] = i
        }

        // Store in known model pre-computed cache
        knownModelCache[key] = knownModel

        return knownModel
    }

    function distance(model: any, knownModel: Record<string, number>) {
        // Calculate the distance to the known model.
        let dist = 0

        for (let i = 0, l = model.length; i < l; i++) {
            if (knownModel[model[i][0]]) {
                dist += Math.abs(model[i][1] - knownModel[model[i][0]])
            } else {
                dist += MAX_GRAMS
            }
        }

        return dist
    }

    return {
        detect: async function(text: string) {
            // Return the ISO 639-2 language identifier, i.e. 'en'.

            if (!text) {
                return UNKNOWN
            }

            text = text.slice(0, MAX_LENGTH).replace(/[\u0021-\u0040]/g, '')

            return await identify(text)
        },
        info: async function(text: string) {
            // Return language info tuple (id, code, name), i.e. ('en', 26110, 'English').

            const language = await this.detect(text)
            if (language === UNKNOWN) {
                return [UNKNOWN, UNKNOWN, UNKNOWN]
            }

            return [language, IANA_MAP[language], NAME_MAP[language]]
        },
        code: async function(text: string) {
            // Return the language IANA code, i.e. 26110.

            const language = await this.detect(text)
            if (language === UNKNOWN) {
                return -1
            }

            return IANA_MAP[language]
        },
        name: async function(text: string) {
            // Return the full language name, i.e. 'English'.

            const language = await this.detect(text)

            if (language === UNKNOWN) {
                return UNKNOWN
            }

            return NAME_MAP[language]
        },
    }
}
