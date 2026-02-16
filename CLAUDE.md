# Phonics Flashcard Game

## Project Overview

A digital phonics flashcard game for two young children (ages 2 and 4) learning to read using phonics-based methods. The game supplements BBC phonics materials and physical flashcards.

The core problem being solved: the children have become rigidly attached to specific word associations with letters (e.g., always saying "mountain" for M). The digital version fixes this by randomly selecting from multiple example words per letter each time a card is flipped.

## How It Works

- **Front of card**: Shows the lowercase letter on its own
- **Back of card**: Shows the uppercase + lowercase letter, plus a randomly selected example word with the first letter emphasised (bold/larger), plus an illustration of that word
- **Each flip** picks a new random word from the letter's word list
- Cards are tapped to flip (no buttons)

## Current State

A working React (.jsx) single-file implementation exists with:
- All 26 letters with curated word lists (see below)
- Tap-to-flip card mechanic with smooth 3D flip animation
- Setup screen with letter selection (tap grid or type letters)
- Ordered (A-Z) and Random mode options
- Playful pastel colour scheme, rounded corners, Fredoka font
- Navigation (prev/next), restart, and "all done" state

**What's missing and needs adding:**
1. **Images** — Each word needs a simple, cartoony, bright illustration suitable for young children. SVGs are the preferred format for file size. These should appear on the back of the card alongside the word text.
2. **Sounds** (optional/future) — Letter sounds or word pronunciations. The Web Speech API (speechSynthesis) is a zero-effort option worth considering before sourcing audio files.

## Word Lists (finalised)

These have been carefully curated for phonetic consistency — short vowel sounds only, no silent letters, no complex digraphs, no ambiguous terms. UK English where relevant (ladybird not ladybug).

- **A**: apple, ant, alligator, arrow
- **B**: ball, bear, banana, butterfly, bird, boat, bee, book
- **C** (hard c only): cat, car, cake, carrot, cow, candle, castle, cup
- **D**: dog, duck, dinosaur, door, drum, dolphin, daisy
- **E** (short e): egg, elephant, elbow, envelope
- **F**: fish, frog, flower, fire, fox, feather, fan, fork
- **G** (hard g only): goat, grapes, guitar, gorilla, gift, grass
- **H**: hat, horse, house, heart, hammer, hippo, hand
- **I** (short i): igloo, insect, iguana
- **J**: jar, jellyfish, jam, juice
- **K**: kite, key, king, koala, kangaroo, kitten, kettle
- **L**: lion, leaf, lemon, ladder, lamp, ladybird
- **M**: moon, mouse, monkey, mountain, milk, mushroom, muffin, map
- **N**: nest, nut, nose, noodles, nurse, needle
- **O** (short o): octopus, otter, olive
- **P**: pig, pizza, penguin, pear, panda, pencil, pumpkin, parrot
- **Q** (qu- sound): queen, quilt
- **R**: rabbit, rainbow, rocket, robot, rose, ring, rain
- **S**: sun, star, snake, strawberry, sock, snail, spider, sandwich
- **T**: tree, tiger, turtle, train, tomato, toothbrush, tent
- **U** (short u): umbrella
- **V**: violin, vase, van, vest, volcano, vegetables
- **W**: whale, watermelon, window, worm, watch, wagon, wolf
- **X**: x-ray
- **Y**: yak, yarn, yogurt, yawn
- **Z**: zebra, zipper, zoo, zero, zigzag

## Design Principles

- **Audience**: 2-4 year olds. Everything must be clear, bright, and unambiguous.
- **Style**: Cartoony, bright colours, not too fussy. Clarity is the priority.
- **UK English**: Use UK spelling and terminology throughout.
- **Phonetic consistency**: No words with silent letters, unexpected pronunciations, or digraphs that contradict what the children are learning. Short vowel sounds only for vowel letters.
- **Variety**: The random word selection is the core feature — it prevents rigid associations.

## Suggested Project Structure

```
/phonics-flashcards
  PhonicsFlashcardsGame.jsx   (main game component - exists)
  CLAUDE.md                    (this file)
  /images
    apple.svg
    ant.svg
    ...
  /audio                       (future, if needed)
```

## Technical Notes

- Built as a React component with hooks (useState, useCallback, useMemo, useEffect)
- Uses Tailwind-style inline styles (no external CSS)
- Loads Fredoka font from Google Fonts
- No external dependencies beyond React itself
- The existing .jsx file contains the complete word data, colour scheme, card component, and game logic
