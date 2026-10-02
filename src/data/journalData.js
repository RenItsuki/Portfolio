/**
 * ============================================================================
 * JOURNAL, STORIES & POEMS DATA ARCHIVE
 * ============================================================================
 * 
 * Supports:
 *   - Short Stories ("shortstory")
 *   - Long Stories ("longstory")
 *   - Poems ("poem")
 *   - Field Essays ("essay")
 * 
 * Each entry includes:
 *   - id: Unique slug
 *   - title: Main title
 *   - subtitle: Atmospheric tagline or genre note
 *   - type: "shortstory" | "longstory" | "poem" | "essay"
 *   - category: Human-readable category label
 *   - date: Publication date
 *   - readTime: Estimated reading duration
 *   - tag: Filter / badge tag
 *   - coverImage: Atmospheric high-res photography URL
 *   - accentColor: Primary theme glow hex color
 *   - excerpt: Short 1-2 sentence synopsis
 *   - lyrics: Array of concise summary lines streamed during playback
 *   - content: Complete raw text
 *   - pages: Curated book spread pages with chapters & formatted dialogue
 */

/**
 * ============================================================================
 * 🔗 GOOGLE SHEET STORIES CONFIGURATION (METHOD 2 & METHOD 3)
 * ============================================================================
 * 
 * Paste your public Google Sheet link or Sheet ID here:
 * Example:
 *   export const GOOGLE_SHEETS_STORIES_URL = "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing";
 * 
 * When this is set, the website will dynamically fetch all your stories, poems,
 * and Google Drive cover images from your Google Sheet in real time!
 * 
 * Leave as "" to use the local stories defined below.
 */
export const GOOGLE_SHEETS_STORIES_URL = "";

export const essays = [
  // ==========================================================================
  // 1. SHORT STORY: THE LAST DAY (CAMPUS FAREWELL)
  // ==========================================================================
  {
    id: "story-the-last-day",
    title: "The Last Day",
    subtitle: "A Quiet Farewell on Campus",
    type: "shortstory",
    category: "Short Story",
    date: "October 2026",
    readTime: "3 min read",
    tag: "Short Story",
    coverImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    accentColor: "#d97746",
    excerpt: "The campus feels small today; twelve hours flew by like seconds. A quiet confession on our final day—not asking for an answer, but loving completely before time takes us in different directions.",
    lyrics: [
      "The campus feels small today; twelve hours just flew by.",
      "Strange, isn't it—we spent years here, always thinking there would be more time.",
      "I found an old group photo, and your smile settled it.",
      "I've always loved easily, even after learning what it costs.",
      "I don't want an answer—it's better if it stayed the same.",
      "Somewhere in your life, remember one idiot loved you quietly, completely.",
      "You're already more than enough to make someone who swore never to love, fall anyway."
    ],
    pages: [
      {
        pageNumber: 1,
        chapter: "Part I · The Group Photo & The Quiet Realization",
        content: [
          "The campus feels small today. Twelve hours, and they just flew by. Strange, isn't it, we spent years here, always thinking there would be more time. Maybe that's why we pushed something. And now there isn't.",
          "But I don't regret it. The time I spent here was one of the best parts of my life.",
          "I was thinking not to say this. It would easier. Much cleaner. You would've gone on exactly the same, and I would've just carried it quietly, as I usually do. But I think that would not be fair to you.",
          "Do you remember that group photo? You probably do, you love keeping pictures of things that matter. I didn't. I found it later, while deleting things that no longer felt worth holding onto. Old pictures, random notes, fragments. And then I saw you.",
          "I had been confused about my feelings before that. But your smile settled it. Or maybe made it more complicated. It wasn't loud, no sudden realization, no dramatic shift. Just a quiet thought that arrived without asking:",
          "…so that's it. I'm done for."
        ]
      },
      {
        pageNumber: 2,
        chapter: "Part II · Loving Anyway & All of It",
        content: [
          "I've always loved people easily, almost like a bad habit. That never changed, even after I learned what it costs. People leave. Or time takes them. Or life moves in a direction you can't follow. No matter how tightly you hold on, it doesn't stop any of it. I tried holding till it hurt. It didn't help.",
          "So now I just don't. I just accept it and love anyway. Maybe even more than before, as if making myself believe loving enough could make up for what was lost. It doesn't. But I do it anyway.",
          "I understood that kind of love, the kind people call simple, safe. But this was something else. And I knew enough to stay away from it. I tried to keep things where they were. I tried to suppress it in all the ways I'd learned over years. Because you mattered more than that risk.",
          "But now, what I feel for you, I don't regret it. In fact, I'm glad it happened. I never thought it would ever be possible. But it started, and grew, and I watched it happen. I tried to make it small, safe. But I didn't want to push you. You were precious to me. So I failed.",
          "You became someone I couldn't just see as a friend.",
          "Your smile. Your tears. Your unfunny jokes that made me quietly worry about you. Your unnecessary drama. Your silence when something's wrong. The way you pretend you're fine when you're not. The way you show yourself strong even when your legs are shaking. The way small wins delighted you, and even small losses, like not getting your favorite flavor, could genuinely ruin your afternoon.",
          "All of it. I love all of it."
        ]
      },
      {
        pageNumber: 3,
        chapter: "Part III · Don't Answer & The Quietest Vow",
        content: [
          "I'm not saying this as if I want something in return. I don't. I don't want an answer. I don't want that change. It's better that it stayed the same. It's better if you don't answer.",
          "Because I know how this ends. Never, not today, not tomorrow. I know how I am. I don't give up on things once they start mattering to me. If I let something grow, I see it through, no matter what it costs. It hurts sometimes but I'm used to that. But I know this isn't something I should treat that way.",
          "Because if I let go of myself, if I let this become real, I won't be able to step back. I'll keep choosing it. I'll keep choosing you. Even when I know I shouldn't.",
          "And that is not fair to you. Because I am not the way people expect someone to be. I've learned not to promise time I'm not sure I have. So this isn't me not wanting it. It's me knowing I would want it too much, and not knowing how to stop once I do. I don't want you holding onto something that might not stay long enough to be held.",
          "So don't.",
          "Don't love me. Let this stay with me.",
          "Think of it like, somewhere in your life, among all the people you'll meet and eventually forget, there was one idiot who loved you like this. Completely. Quietly.",
          "That's enough for me. That's more than enough for me.",
          "It's the last day. So I won’t make things harder than they need to be.",
          "Take care. And please don't overthink about this.",
          "And don't change too much.",
          "You're already more than enough,\nenough to make someone who swore never to love, fall anyway."
        ]
      }
    ],
    content: `The campus feels small today. Twelve hours, and they just flew by. Strange, isn't it, we spent years here, always thinking there would be more time. Maybe that's why we pushed something. And now there isn't.
But I don't regret it. The time I spent here was one of the best parts of my life.
I was thinking not to say this. It would easier. Much cleaner. You would've gone on exactly the same, and I would've just carried it quietly, as I usually do. But I think that would not be fair to you.
Do you remember that group photo? You probably do, you love keeping pictures of things that matter. I didn't. I found it later, while deleting things that no longer felt worth holding onto. Old pictures, random notes, fragments. And then I saw you.
I had been confused about my feelings before that. But your smile settled it. Or maybe made it more complicated. It wasn't loud, no sudden realization, no dramatic shift. Just a quiet thought that arrived without asking:
…so that's it. I'm done for.
I've always loved people easily, almost like a bad habit. That never changed, even after I learned what it costs. People leave. Or time takes them. Or life moves in a direction you can't follow. No matter how tightly you hold on, it doesn't stop any of it. I tried holding till it hurt. It didn't help.
So now I just don't. I just accept it and love anyway. Maybe even more than before, as if making myself believe loving enough could make up for what was lost. It doesn't. But I do it anyway.
I understood that kind of love, the kind people call simple, safe. But this was something else. And I knew enough to stay away from it. I tried to keep things where they were. I tried to suppress it in all the ways I'd learned over years. Because you mattered more than that risk.
But now, what I feel for you, I don't regret it. In fact, I'm glad it happened. I never thought it would ever be possible. But it started, and grew, and I watched it happen. I tried to make it small, safe. But I didn't want to push you. You were precious to me. So I failed.
You became someone I couldn't just see as a friend.
Your smile. Your tears. Your unfunny jokes that made me quietly worry about you. Your unnecessary drama. Your silence when something's wrong. The way you pretend you're fine when you're not. The way you show yourself strong even when your legs are shaking. The way small wins delighted you, and even small losses, like not getting your favorite flavor, could genuinely ruin your afternoon.
All of it. I love all of it.
I'm not saying this as if I want something in return. I don't. I don't want an answer. I don't want that change. It's better that it stayed the same. It's better if you don't answer.
Because I know how this ends. Never, not today, not tomorrow. I know how I am. I don't give up on things once they start mattering to me. If I let something grow, I see it through, no matter what it costs. It hurts sometimes but I'm used to that. But I know this isn't something I should treat that way.
Because if I let go of myself, if I let this become real, I won't be able to step back. I'll keep choosing it. I'll keep choosing you. Even when I know I shouldn't.
And that is not fair to you. Because I am not the way people expect someone to be. I've learned not to promise time I'm not sure I have. So this isn't me not wanting it. It's me knowing I would want it too much, and not knowing how to stop once I do. I don't want you holding onto something that might not stay long enough to be held.
So don't.
Don't love me. Let this stay with me.
Think of it like, somewhere in your life, among all the people you'll meet and eventually forget, there was one idiot who loved you like this. Completely. Quietly.
That's enough for me. That's more than enough for me.
It's the last day. So I won’t make things harder than they need to be.
Take care. And please don't overthink about this.
And don't change too much.
You're already more than enough,
enough to make someone who swore never to love, fall anyway.`
  },

  // ==========================================================================
  // 2. LONG STORY: PROJECT GENYUME (DELICATE AS BUTTERFLY WINGS)
  // ==========================================================================
  {
    id: "story-project-genyume",
    title: "Project Genyume: Delicate as Butterfly Wings",
    subtitle: "Parallel Timelines & Reality Markers",
    type: "longstory",
    category: "Long Story",
    date: "September 2026",
    readTime: "12 min read",
    tag: "Long Story",
    coverImage: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80",
    accentColor: "#38bdf8",
    excerpt: "In a cluttered lab at sunset, Shiki and Mana discover that his head injury causes spontaneous, hyper-real dreams of alternate worlds. To test their reality, they devise a mathematical marker on their skin—unaware of the trauma lurking in the shadows.",
    lyrics: [
      "Butterfly wings are made of chitin, branching like trees—delicate and unrepairable.",
      "After the accident, the dreams felt more real than waking life.",
      "Two versions of the same week living simultaneously in one mind.",
      "Project Genyume: A reality marker written on skin—7073828384.",
      "If the formula holds true across worlds, our reality remains unbroken.",
      "Flashes of red, silent guilt, and the terror of waking up alone."
    ],
    pages: [
      {
        pageNumber: 1,
        chapter: "Act I · The Cluttered Lab & Butterfly Wings",
        content: [
          "I guess it all started that day, in that cluttered lab...",
          "(In a lab, two person are sitting, there are beaker, test tube, measuring scale, on the tabe, it was about sunset)",
          "?? (sitting near the lab table, pouring some chemicals): Did you know butterfly wings are among the most delicate things in the world?",
          "??? (head down on the table): Yeah... because they’re made of a thin layer of chitin, super light, and can’t be repaired once damaged.",
          "??: Wow, you knew that? Also, you really shouldn’t rest your head on the table like that—aqueous aspirin could get on your coat and leave a nasty stain.",
          "??? (sits up, annoyed): Yeah... because someone’s been talking about them non-stop for the past three days—Shiki. And, for the record, I do know that, but I also know you’re too careful to spill anything, even by mistake.",
          "Shiki (fake angrily): Sorry for being cautious! I’m just fascinated by it. Also— (nerdy) did you know butterfly wings extend from the body, branching into infinitesimally small structures that form the delicate wings?",
          "???: Just like a tree.",
          "Shiki (excitedly): Yeah yeah! That’s why I like talking to you, Mana—you just get me.",
          "Mana (softly, comically): Which means I have to put up with your endless theories and ideas.",
          "Shiki: Hmm? What was that?",
          "Mana (thinking): Nothing... (If he’d heard that, I’d be stuck in another explanation marathon instead of the Superman movie marathon I was hoping for.) Oh... now I understand why you’re so fascinated by it.",
          "Shiki: ...?",
          "Mana: Your name. It means “tree,” right?",
          "Shiki (laughs): That’s absurd.",
          "Mana (bluntly): Well... if the shoe fits.",
          "Shiki: It has nothing to do with my name. I just feel a connection to delicately branched things.",
          "Mana (thinks): Branched things... So is it because of your current oppression with Many Worlds Interpretation theory?",
          "Shiki: Maybe. But there’s nothing delicate about that."
        ]
      },
      {
        pageNumber: 2,
        chapter: "Act II · The Memory of the 17th vs The 14th",
        content: [
          "Mana (a little annoyed): Forget that. Why did you call me here in the middle of the day? Please don’t tell me it was just to talk about butterflies.",
          "Shiki (embarrassed): No... or maybe yes...",
          "Mana (angrily stands up): What?! You made me walk 3 kilometers in this blistering sun—from my air-conditioned room to this oven—just to give a lecture on butterfly wings?! I’m leaving.\n(She storms toward the exit.)",
          "Shiki (pleading): No, no, please don’t go… It’s about the accident I had last month.\n(Mana stops at the door, then rushes back to him.)",
          "Mana (urgent and caringly, almost tears in her eyes): What?! Are you okay? Why didn’t you start with that?! Do you want me to call the hospital??",
          "Shiki (flustered as she checks the side of his head): I-I’m okay...",
          "Mana: Don’t scare me like that… That accident was no joke, Shiki. Your head was pouring blood—I thought you were going to die…",
          "Shiki (softly, to himself): Classic Mana... acts tough, but delicate as butterfly wings—and caring like a mother. (to her) Sorry for scaring you. I’m fine, really. Just... I’ve been having these strange dreams lately.",
          "Mana (easing back to her usual tone, letting go of his head): Strange dreams? Is your brain even working properly? (bluntly) You’ve been acting weirder than usual—talking about butterfly wings like it’s a conspiracy. Want me to give you the number of a good psychiatrist?",
          "Shiki (laughs, genuinely comforted): There you go... back to normal.(thinking) but i never knew that she was that shocked by the incident.",
          "Mana: Hmm?",
          "Shiki (quickly, a bit afraid): Nothing..and no need for psychiatrist,",
          "Mana (concerned): But..",
          "Shiki (cutting in): I was saying—about five days ago, just a few days after I got discharged from the hospital—I started having these strange dreams.",
          "Mana (practically): Like… getting hit by a car? Or smashing your head on something? Those kinds of dreams aren’t uncommon after trauma. They usually fade.",
          "Shiki: If that were it, I wouldn’t call them strange. These are... different.",
          "Mana (now truly curious, and a little more concerned): Different how?",
          "Shiki (annoyed but not seriously): I’ll tell you—if you let me finish. You’re always so impatient.(pauses, takes a breath, then turns to her) Let’s take it from the top.",
          "Mana (seriously): Okay, I’ll be quiet.",
          "Shiki (clears his throat and took a long breathe): Well… at first, I didn’t really notice—or care—about these weird dreams. But then… things started getting creepy."
        ]
      },
      {
        pageNumber: 3,
        chapter: "Act III · Dream 1 & The Duplicate Realities",
        content: [
          "Mana (listening carefully): Hmm…",
          "Shiki (continues): The first dream started with me waking up in my apartment. Everything felt normal, like any regular morning. I brushed my teeth, got ready—routine stuff. Then I called you and said, “When should I pick you up?” You replied, surprised, “For what?” And I said, “Did you forget…”",
          "Mana (interrupts, eyes narrowing): “The National Fossil Museum inauguration ceremony.” (confused, looking at him) Wait—that’s what I said to you four days ago. I was the one who called you about it. And those are the exact words. You’re saying you said my lines in your dream?",
          "Shiki (stoically): Yeah...",
          "Mana (confused, suddenly stands and slams the table): Are you trying to pull a prank on me? Because if you are, it’s not funny!",
          "Shiki (quickly, seriously): Please... just let me finish.\nMana (pauses, noticing the look on his face—some strange mix of pain, confusion, and seriousness—her voice softens, worried): What… is happening to you?",
          "Shiki (continues): After I asked you about the NFM inauguration in the dream...",
          "[Dream 1]\nMana (sassily): Did you add day-drinking to your list of weird habits?\nShiki (confused): No... why?\nMana (stoically): Because it’s on the 17th, doofus.\nShiki (still confused): Wait, what? Didn’t you tell me it was on the 14th? You were so adamant I shouldn’t go because I had just been discharged from the hospital, but I insisted… and you eventually agreed.\nMana (concerned and confused): Are you actually drinking? Yeah, I didn’t want you going in your condition, but not adamant, as it was a week after your discharge, and the date is the 17th. You can check the website if you want.\nShiki (his voice softening, slowly realizing something’s off): Yeah... I checked. And yeah, you did tell me it was on the 17th and you were not that adamant So why…? (He holds his head suddenly as a sharp pain hits. The phone slips from his hand.)\nMana (from the phone, worried): Hello? Shiki? Are you okay? Hello??\nShiki (back in the present): ...And then I woke up.",
          "Mana (shocked): So you're telling me you dreamt the future? Like... a vision? Precognition?",
          "Shiki (seriously): You could say that, but—",
          "Mana (cutting in, worried): But what?",
          "Shiki (gently, trying to calm her): Calm down. Don’t worry so much. I’m not dying, okay?",
          "Mana (suddenly grabs his collar—angry, scared, and serious): How many times do I have to tell you not to joke about dying, huh!?",
          "Shiki (apologetic and startled): Sorry! Sorry! I didn’t mean it like that…",
          "Mana (calming down, releasing his collar): I know you were trying to soothe me… but don’t say things like that again.",
          "Shiki (a bit guilty): Okay..."
        ]
      },
      {
        pageNumber: 4,
        chapter: "Act IV · The Uncontrollable Sleep & Flashback",
        content: [
          "Mana (already shifting back to normal): So—but?",
          "Shiki (caught off guard by how quickly she recovers): Y-Yeah... So, I think it's not just that I dreamt it... Somehow, I also remember everything from that dream world.",
          "Mana (not entirely shocked): Well, it’s not that surprising. I mean, yeah—it’s rare, but people do recall vivid dreams sometimes. Usually we forget 90% of them within ten minutes, but still…",
          "Shiki: No, you’re not getting it. I don’t just remember the dream. I remember living in it. Full memories—like you telling me it was on the 17th, being less adamant, even everything you said on the 12th…",
          "Mana (pausing, trying to piece it together): …",
          "Shiki: It’s like I have two versions of the same week in my head. One where you were stubborn about the 14th… and one where you were chill about the 17th.",
          "Mana (gulping, trying to ground herself): Okay... But how do you know you're not just... making those memories up?",
          "Shiki (with a trace of sadness): Yeah… I did think I was just making it up at first. But the more I thought about the dream, the more details I remembered. Like why the ceremony was on the 17th and not the 14th—because the chief guest had other plans. Even the weather—heavy rain at 2 PM on the 13th. Just… so many little things.",
          "Mana (gulps, realizing the implications): So you're saying you experienced...",
          "Shiki (stoic): A different world. Yeah… I think so. And it’s not just because of that dream.",
          "Mana (shocked): You’ve had more dreams like this?",
          "Shiki (calm but weary): Yeah...",
          "Mana (quiet for a moment, then softly): ...So maybe... is this a dream too?",
          "Shiki (genuinely rattled): I never thought of that... that’s why I—",
          "Mana (suddenly stands, grabs his collar, shakes him): THEN JUST WAKE UP!! SHIKI!! WAKE UP!!",
          "Shiki (shocked, mentally and physically): I—don't—think—",
          "Mana (voice cracking): Don't say anything—just wake up… wake up... wake up!\nMana (worried and scared): Wake up, Shiki… please…",
          "Shiki (eyes shoot open, gasping): ...Was I dreaming?",
          "Mana (soft, concerned): Are you okay? You were about to say something…",
          "Shiki (catching his breath, visibly unsettled beneath the surface): (cutting in) When… did I fall asleep?",
          "[Scene shifts into flashback]\nMana (nudging him lightly): Hey… Shiki? You awake? (jokingly) Who falls asleep while psyching themselves up for a lecture?(glances at his face, worry creeping in)(starts checking his pulse, breathing) Okay… you're breathing, and your pulse is steady… But why aren’t you waking up? Was this… what he was going to talk about? Falling asleep randomly?(sprinkles water on him) Hey. Wake up, Shiki. Come on… This doesn’t feel like a normal nap.\n(quietly to herself) I should be freaking out right now. But that accident—maybe it really did something deeper…\n(paces slightly, looks around the lab, searching for anything useful—then stops, clenches her fists) What do I do now…? From what he said, sleep is the main concern. Dreams are. So he should wake up on his own.\n(sits beside him, voice low, emotional) It’s getting harder to see you like this, Shiki… I already watched you unconscious for days in that hospital bed. Don’t you think… it’s time to wake up?\nShiki (murmuring in his sleep, distressed): I—don’t—think—\nMana (grabs his shoulders, panicked): Shiki! Shiki! Wake up! Tell me what you don’t think! But tell me awake—please!\n[Flashback fades, present returns]"
        ]
      },
      {
        pageNumber: 5,
        chapter: "Act V · Whiteboard: Project Genyume & Reality Formula",
        content: [
          "Mana (softly, brushing a bit of hair from his face as he fully regains himself): …And that’s when you finally woke up.",
          "Shiki (realizing, his voice low): Then… things are getting worse.",
          "Mana (immediately concerned): What do you mean?",
          "Shiki (takes a breath, then begins explaining everything he had told the other Mana in the dream world — the fossil museum conversation, the duplicate memories, the two versions of events, and how real it all felt)",
          "Mana (stunned, trying to process): That’s… a lot to take in.(leans back slightly, as if the weight of it is physically pushing her)A dream that feels as real—maybe more real—than this world… And now your memories from those dreams are bleeding into this one?(pauses, visibly shaken)Shiki, that’s not just strange—that’s terrifying. Like... it’s not just a dream anymore, it’s something else. Something haunting.",
          "Shiki (with a faint smirk, trying to lighten the mood): I knew you’d be able to understand this better than I could and make it more frightful. Statistically speaking, females are more emotionally adaptable than males.",
          "Mana (fake-offended, rising to his bait with crossed arms): I know you’re trying to cheer me up… But if you keep using that method, the scariest thing you’ll be facing won’t be your dreams.",
          "Shiki (awkwardly smiling): Okay, sorry!!",
          "Mana (serious): So… what exactly has made it worse?",
          "Shiki (tone shifting to serious): Well, at first I only dreamed when I chose to sleep—under my control. But now… from what you told me.. it may just happen. Anytime. Anywhere.",
          "Mana (growing concern, voice steady): You mean… you can fall asleep without warning? And dream those same hyper-real dreams? And even when someone tries to wake you—talking, water, shaking—you don’t respond?(pauses, bluntly) Yeah… that’s worse. Much worse.",
          "Shiki (quietly): Yeah.\n(They went silent for a while.)\nMana (breaking the silence): So… what now?",
          "Shiki (softly): Before all this—before I realized I could fall asleep anytime, anywhere—I had a plan.\nMana (curiously): And that was?\nShiki (softly): Well, the first step was telling you—which I’ve done. After that, I thought I could observe more about the dreams. Try to figure out the cause, how long they last… and maybe how to stop them. Whether it’s another world or just a side effect of the head injury… (Mana looks a little uneasy.) But…\nMana (still a little uneasy, but resolute): But what? You can still do all that, right?\nShiki (seriously): How? I fall asleep without warning—and worse, I don’t even realize it. I don’t know if I’m dreaming or awake, or if what I think I’m observing is even real. How can I study something when I don’t know if I’m even present?",
          "Mana (realizing and sighing): Alright, no need to dance around it. Just say you want my help.\nShiki (grinning): No, I could never make you do that.\nMana (seriously): Okay then. I will.\nShiki (cutting in): If you’re insisting that much… How can I say no?\nMana (sighing): Even now, you’re fooling around. (Smiles, thinking to herself) Classic Shiki\nShiki (enthusiastically, eyes lighting up): Now we’re talking.",
          "Mana (serious but with a hint of a smile): I know you want to experiment with whatever’s happening to you—and I know trying to stop you now is pointless. But listen: I’ll only help if you promise me something. If things get out of hand, we’re going straight to a doctor. No excuses.\nShiki (puffing out his cheeks childishly): Okay, I will. Promise.\nMana (sighs, tone soft but serious): I don’t know what’s really happening to you. Even after everything I’ve seen and heard, I still can’t fully believe that \"experiencing different worlds\" is actually possible... (clears her head and throat) But—I believe in you. And right now, that’s all the reason I need.\nShiki (silent for a beat, then grinning cheekily): Ohhh Mana, I didn’t know you were such a softie.\nMana (blushing, flustered, lightly punches his arm): Shut up.",
          "[They rearrange the room for a focused discussion—clearing space, pulling chairs around, switching on the lights as the sun sets. A whiteboard is set up.]\n[They begin jotting down everything they know so far—clarity through structure.]\n\nWHITEBOARD — PROJECT GENYUME\n• Sleep can occur anytime, anywhere (assumption)\n• While asleep, Shiki cannot be woken through normal means\n• Dreams during this sleep feel completely real, indistinguishable from waking life\n• Memories from dream and reality are merging\n• Cause — Unknown\n• Duration — Unknown\n• How to reverse it — Unknown",
          "[They pause, both staring at the whiteboard. The sunset outside paints the lab glass in a soft amber glow. The room is calm but charged with a strange tension. Mana clicks the marker cap closed and steps back, arms crossed.]\nMana (studying the board): So… this is everything we know so far.\nShiki (nodding): Yeah. So I think the first thing we need to figure out is: what's the trigger?\nMana (bluntly): That’s your inner scientist talking. But I think the more important question is: how are we supposed to tell whether we’re in a dream—or a different world—from reality?\nShiki (understandingly): You’re right. A marker.\nMana: A reality marker.\nShiki (excited): Yeah! What should we do?[They fall silent, thinking.](grabbing a second marker, begins writing on the board while muttering): Something unique to this world… Something personal. We could share secrets? No, too unreliable… Maybe something written—yeah, on the body. Hand, maybe. Numbers. Yeah. Numbers.(turns to her, eyes lighting up) Mana, I got it.\nMana (sighs, amused): I heard you. Your monologue was leaking again, doofus.\nShiki (embarrassed): I did it again, huh…\nMana (smiling, supportive): But that’s actually genius. If you write down a number—say, on your hand—and check it in the dream, it’ll either be gone or different. Even if you’re in a different world entirely, the odds of two large, random numbers matching are basically zero. All thanks to the butterfly effect. And you and I can easily remember one number.\nShiki (suddenly realizing): Maybe that’s why I kept thinking about butterflies... Look at us, already solving mysteries.\n[Mana gives a proud smile.]\nShiki (still riding the wave): But… using only one number might not be enough. There’s still a microscopic chance of a match.\nMana (puzzled, then catching on): So what— (pauses, then lights up) We use two numbers. And then link the second number to the first using some kind of formula. That way, even if the first is guessed or repeated, the second would never match up unless it’s the same reality. That makes it… basically impossible to fake. One number goes on my hand, the other on yours. That way, even over a call, we can confirm them instantly.\nShiki (grinning smugly): Now you get me, Assistant Mana.\nMana (playfully punches his shoulder): Don’t push your luck.\n\n[They choose the first number: 7073828384, and a formula: (ones digit + last digit) × 1st number, then truncate to the number of digits of the 1st number from the ones digit. The second number: 7812112224]"
        ]
      },
      {
        pageNumber: 6,
        chapter: "Act VI · Mana’s Secret Panic & The Ride Home",
        content: [
          "Shiki (laughs, glancing at the board): This is nice. We haven’t done this in a long time.\nMana (writing, a little distracted): What?\nShiki (bluntly but fondly): This—experimenting, making hypotheses, scribbling nonsense on whiteboards. All the stuff we used to do back then.\nMana (still writing, faintly smiling): Hmm…\nShiki (more animated): Do you remember that one time I wanted to find out what happens when you point a laser at an eye?\nMana (slows down a little, uneasiness creeping in)\nShiki (oblivious to her discomfort, chuckling): We tried it on the dissected frog eye first, but it didn’t give any good results. So I was about to try it on my own eye—a low-power laser, of course.\nMana (tense, pausing mid-write)\nShiki (grinning): I knew it wouldn’t do any lasting damage, and deep down you knew it too—even if you were a bit hesitant. If it weren’t for Koma ratting us out to the professor, we probably would’ve gone through with it. Poor guy, even his tattling sounded like a whisper.(laughs again) Man… I miss those times.\nMana (quietly, still writing): Hmm...\nShiki (noticing): Hey, what are you writing?\n(He glances. The whiteboard is covered in gibberish—random shapes, incomplete words, loops and numbers with no meaning.)\nMana (startled, blinking at it): Wh… What the—?\nShiki (joking): Whoa. You okay there, Assistant Mana? Or are you dreaming now?\nMana (acting strange): No, I’m o—\n(She suddenly rushes to the bathroom and vomits into the sink. Shiki quickly follows.)\nShiki (very worried): Are… you okay?\nMana (still shocked, trying to recollect herself): Yeah…\nShiki (concerned): You don’t look ok. What just happened?\n(Without answering, Mana hurries back to the lab, grabs her bag, and heads for the exit. Shiki follows, unsettled.)\nShiki (afraid): At least—\nMana (cutting in): I’m okay. Don’t worry. (dryly) And no—I’m not pregnant. We’ll talk tomorrow, at the same time. Be ready.\nShiki (a little shocked by the word “pregnant” and clearly concerned): Wh… What was that all about?(Trying to shake it off with a nervous chuckle) I mean… if she can joke about that, she’s probably okay… right?(Pauses, looks down at his hand) I’m not dreaming, am I?\n[Checks his number—7073828384. Then quickly texts Mana to check hers. A moment later, she replies: 7812112224 Doofus]\nShiki (relieved at first): Okay… I’m not dreaming. That’s a relief—(Pauses, frowns) Wait. That’s not a relief. What just happened really was real.(Looks at the screen again) At least she sounds—or reads—normal.(Sighs, more serious) She’s more mature than me. Smarter too. At least she won’t do anything reckless…(Softly, to himself) …Which is a relief.\n[He cleans up the lab, puts everything back in its place, turns off the lights, locks up, and heads back to his apartment.]",
          "[Earlier — Mana’s POV, moments before she ran out]\n[Shiki in the background, reminiscing]\nMana (thinking, faint smile while writing): We were so chaotic. Yeah… that time.\n(Suddenly, a flash: Shiki’s accident—blood, the sharp noise, the panic. Her hand, stained red.) (Her marker slows)\nMana (thinking): Not now. If he finds out…\n(She resumes writing—quicker, shakier.)\nShiki (chuckling, oblivious): Hey, what are you writing?\n(She looks up—sees the board. It’s gibberish. Shapes. Numbers. Broken words.)\nMana (startled, blinking at it): Wh… What the—?\n(Thinking, panicked) No—no. Not now. If this continues, he’ll figure it out—\n(More flashes. Blood. Shiki, limp in her lap. His head split. Her hands trembling.)\nA voice (inside, eerily like her own): You know it was your fault. If only you’d stopped him. If only you hadn’t made that mistake. If only you weren’t his friend.\n(The images crescendo—blood, screams, guilt.)\nMana (acting strange): No, I’m o—\n[She bolts from the lab.]\nMana (thinking, staggering into the bathroom): No… no…no.. noo (The voices and visions claw at her. She vomits into the sink. Her hands grip the edges. The noise fades. Her head clears slightly.)\n[Behind her, Shiki’s voice—distant, worried.]\nShiki (from outside): Are… you okay?\nMana (still shocked, trying to recollect herself): Yeah…\nShiki (more concerned): You don’t look okay. What happened?\nMana (thinking, urgent): I can’t stay here. If I do, he’ll know.\n[She rushes back in, grabs her bag.]\nShiki (afraid, trying to stop her): At least—!\nMana (still disoriented, thinking): Say something—something that’ll throw him off. Something weird enough to distract him.\nMana (blurting as she walks out): I’m okay—and no, I’m not pregnant.\n[She disappears through the door.]\n[A few minutes later. Shiki’s phone peeps. He reads the message:]\nText from Shiki: I think I’m dreaming. Can you tell me your number?\nMana (sees the text, still pale, but a tired smile forming): That really shook that doofus…\n[She types back: 7812112224 Doofus]\nMana (walking to her apartment, suddenly stops): Oh no… (realizes) What if he fell asleep on the way home? (guiltily) Shit... I shouldn’t have left him alone like that.[She breaks into a run back toward him] (thinking) I have to call him.\n[She dials, but the phone reads: Currently busy]\nMana (worried): Did he try calling someone… and fall asleep?[She tries calling again]",
          "[Shiki’s POV — after leaving the lab]\nShiki (walking slowly, hands in pockets): This week’s been strange... even for me. First, the dream—or whatever it was—about another world. Weird enough. Then seeing Mana vomiting and acting... off, talking about THAT.(He pauses, grimacing) The worst part? I can fall asleep anytime.(face paling) Oh no…thinking) I can’t afford to fall asleep on the road. My uncle’s already suspicious about me(hesitates) I should call Mana. But... she looked like she’s fighting her own demons. Better not make it worse.(thinking) Calling my uncle is risky... but less risky than him finding me unconscious on the street.\n[He dials]\n[On call, uncle in his car]\nShiki: Hello, Uncle.\nUncle: Hey, Shiki.\nShiki (calmly): Can you pick me up in front of the lab?\nUncle (calm but firm): What’s going on? You don’t usually ask for a ride.\nShiki (nervous, stumbling): Yeah, I—it's just...\nUncle (cutting in): You and lying don’t mix. What’s the matter?\nShiki (awkward): Ah... well…\nUncle (sighs): And you don’t lie unless you have to.\nShiki (hopefully): So…..?\nUncle (sighing): I’m coming, but you better explain everything when I get there.\nShiki (relieved): Aye aye, Captain.\n[Call ends]\nUncle (sighing as he turns the car toward the lab): That kid... How’s he gonna survive in this world?(pauses)Oh yeah. Destroying it is an option for him.\n\nShiki (noticing phone): Ten missed calls… Oh no, I’m dead. How did I not notice?\n[He calls Mana]\nMana (picks up, panting, worried and angry): (shouting) ARE YOU OK?? WHO THE HELL WERE YOU TALKING TO THAT YOU DIDN’T NOTICE?!\nShiki (calm, almost robotic from sheer fear): First—yes, I’m okay. Second—I called Uncle to pick me up. (gulps)\nMana (exhales, flustered): Oh... that makes sense. (abruptly) Okay, then. See you tomorrow.\n[Cuts the call]\nShiki (confused and scared): What was that about...?\n\n[The next day]\nMana (entering the room): Oh, you are already here, I see.\nShiki (yawning): I was pretty bored, I hate summer.\nMana (dropping her bag):"
        ]
      }
    ],
    content: `I guess it all started that day, in that cluttered lab...
(In a lab, two person are sitting, there are breaker, test tube, measuring scale, on the tabe, it was about sunset)
?? (sitting near the lab table, pouring some chemicals): Did you know butterfly wings are among the most delicate things in the world?
??? (head down on the table): Yeah... because they’re made of a thin layer of chitin, super light, and can’t be repaired once damaged.
??: Wow, you knew that? Also, you really shouldn’t rest your head on the table like that—aqueous aspirin could get on your coat and leave a nasty stain.
??? (sits up, annoyed): Yeah... because someone’s been talking about them non-stop for the past three days—Shiki. And, for the record, I do know that, but I also know you’re too careful to spill anything, even by mistake.
Shiki (fake angrily): Sorry for being cautious! I’m just fascinated by it. Also— (nerdy) did you know butterfly wings extend from the body, branching into infinitesimally small structures that form the delicate wings?
???: Just like a tree.
Shiki (excitedly): Yeah yeah! That’s why I like talking to you, Mana—you just get me.
Mana (softly, comically): Which means I have to put up with your endless theories and ideas.
Shiki: Hmm? What was that?
Mana (thinking): Nothing... (If he’d heard that, I’d be stuck in another explanation marathon instead of the Superman movie marathon I was hoping for.) Oh... now I understand why you’re so fascinated by it.
Shiki: ...?
Mana: Your name. It means “tree,” right?
Shiki (laughs): That’s absurd.
Mana (bluntly): Well... if the shoe fits.
Shiki: It has nothing to do with my name. I just feel a connection to delicately branched things.
Mana (thinks): Branched things... So is it because of your current oppression with Many Worlds Interpretation theory?
Shiki: Maybe. But there’s nothing delicate about that.
Mana (a little annoyed): Forget that. Why did you call me here in the middle of the day? Please don’t tell me it was just to talk about butterflies.
Shiki (embarrassed): No... or maybe yes...
Mana (angrily stands up): What?! You made me walk 3 kilometers in this blistering sun—from my air-conditioned room to this oven—just to give a lecture on butterfly wings?! I’m leaving.
(She storms toward the exit.)
Shiki (pleading): No, no, please don’t go… It’s about the accident I had last month.
(Mana stops at the door, then rushes back to him.)
Mana (urgent and caringly, almost tears in her eyes): What?! Are you okay? Why didn’t you start with that?! Do you want me to call the hospital??
Shiki (flustered as she checks the side of his head): I-I’m okay...
Mana: Don’t scare me like that… That accident was no joke, Shiki. Your head was pouring blood—I thought you were going to die…
Shiki (softly, to himself): Classic Mana... acts tough, but delicate as butterfly wings—and caring like a mother. (to her) Sorry for scaring you. I’m fine, really. Just... I’ve been having these strange dreams lately.
Mana (easing back to her usual tone, letting go of his head): Strange dreams? Is your brain even working properly? (bluntly) You’ve been acting weirder than usual—talking about butterfly wings like it’s a conspiracy. Want me to give you the number of a good psychiatrist?
Shiki (laughs, genuinely comforted): There you go... back to normal.(thinking) but i never knew that she was that shocked by the incident.
Mana: Hmm?
Shiki (quickly, a bit afraid):Nothing..and no need for psychiatrist,
Mana (concerned):But..
Shiki (cutting in): I was saying—about five days ago, just a few days after I got discharged from the hospital—I started having these strange dreams.
Mana (practically): Like… getting hit by a car? Or smashing your head on something? Those kinds of dreams aren’t uncommon after trauma. They usually fade.
Shiki: If that were it, I wouldn’t call them strange. These are... different.
Mana (now truly curious, and a little more concerned): Different how?
Shiki (annoyed but not seriously): I’ll tell you—if you let me finish. You’re always so impatient.(pauses, takes a breath, then turns to her) Let’s take it from the top.
Mana (seriously): Okay, I’ll be quiet.
Shiki (clears his throat and took a long breathe): Well… at first, I didn’t really notice—or care—about these weird dreams. But then… things started getting creepy.
Mana (listening carefully): Hmm…
Shiki (continues): The first dream started with me waking up in my apartment. Everything felt normal, like any regular morning. I brushed my teeth, got ready—routine stuff. Then I called you and said, “When should I pick you up?” You replied, surprised, “For what?” And I said, “Did you forget…”
Mana (interrupts, eyes narrowing): “The National Fossil Museum inauguration ceremony.” (confused, looking at him) Wait—that’s what I said to you four days ago. I was the one who called you about it. And those are the exact words. You’re saying you said my lines in your dream?
Shiki (stoically): Yeah...
Mana (confused, suddenly stands and slams the table): Are you trying to pull a prank on me? Because if you are, it’s not funny!
Shiki (quickly, seriously): Please... just let me finish.
Mana (pauses, noticing the look on his face—some strange mix of pain, confusion, and seriousness—her voice softens, worried): What… is happening to you?
Shiki (continues): After I asked you about the NFM inauguration in the dream...
[Dream 1]
Mana (sassily): Did you add day-drinking to your list of weird habits?
Shiki (confused): No... why?
Mana (stoically): Because it’s on the 17th, doofus.
Shiki (still confused): Wait, what? Didn’t you tell me it was on the 14th? You were so adamant I shouldn’t go because I had just been discharged from the hospital, but I insisted… and you eventually agreed.
Mana (concerned and confused): Are you actually drinking? Yeah, I didn’t want you going in your condition, but not adamant, as it was a week after your discharge, and the date is the 17th. You can check the website if you want.
Shiki (his voice softening, slowly realizing something’s off): Yeah... I checked. And yeah, you did tell me it was on the 17th and you were not that adamant So why…? (He holds his head suddenly as a sharp pain hits. The phone slips from his hand.)
Mana (from the phone, worried): Hello? Shiki? Are you okay? Hello??
Shiki (back in the present): ...And then I woke up.
Mana (shocked): So you're telling me you dreamt the future? Like... a vision? Precognition?
Shiki (seriously): You could say that, but—
Mana (cutting in, worried): But what?
Shiki (gently, trying to calm her): Calm down. Don’t worry so much. I’m not dying, okay?
Mana (suddenly grabs his collar—angry, scared, and serious): How many times do I have to tell you not to joke about dying, huh!?
Shiki (apologetic and startled): Sorry! Sorry! I didn’t mean it like that…
Mana (calming down, releasing his collar): I know you were trying to soothe me… but don’t say things like that again.
Shiki (a bit guilty): Okay...
Mana (already shifting back to normal): So—but?
Shiki (caught off guard by how quickly she recovers): Y-Yeah... So, I think it's not just that I dreamt it... Somehow, I also remember everything from that dream world.
Mana (not entirely shocked): Well, it’s not that surprising. I mean, yeah—it’s rare, but people do recall vivid dreams sometimes. Usually we forget 90% of them within ten minutes, but still…
Shiki: No, you’re not getting it. I don’t just remember the dream. I remember living in it. Full memories—like you telling me it was on the 17th, being less adamant, even everything you said on the 12th…
Mana (pausing, trying to piece it together): …
Shiki: It’s like I have two versions of the same week in my head. One where you were stubborn about the 14th… and one where you were chill about the 17th.
Mana (gulping, trying to ground herself): Okay... But how do you know you're not just... making those memories up?
Shiki (with a trace of sadness): Yeah… I did think I was just making it up at first. But the more I thought about the dream, the more details I remembered. Like why the ceremony was on the 17th and not the 14th—because the chief guest had other plans. Even the weather—heavy rain at 2 PM on the 13th. Just… so many little things.
Mana (gulps, realizing the implications): So you're saying you experienced...
Shiki (stoic): A different world. Yeah… I think so. And it’s not just because of that dream.
Mana (shocked): You’ve had more dreams like this?
Shiki (calm but weary): Yeah...
Mana (quiet for a moment, then softly): ...So maybe... is this a dream too?
Shiki (genuinely rattled): I never thought of that... that’s why I—
Mana (suddenly stands, grabs his collar, shakes him): THEN JUST WAKE UP!! SHIKI!! WAKE UP!!
Shiki (shocked, mentally and physically): I—don't—think—
Mana (voice cracking): Don't say anything—just wake up… wake up... wake up!
Mana (worried and scared): Wake up, Shiki… please…
Shiki (eyes shoot open, gasping): ...Was I dreaming?
Mana (soft, concerned): Are you okay? You were about to say something…
Shiki (catching his breath, visibly unsettled beneath the surface): (cutting in) When… did I fall asleep?
Mana (nodding, understanding his unease): You took a deep breath, closed your eyes, and just went quiet. I thought you were collecting your thoughts, but then a minute passed… I got worried and nudged your shoulder—
[Scene shifts into flashback]
Mana (nudging him lightly): Hey… Shiki? You awake? (jokingly) Who falls asleep while psyching themselves up for a lecture?(glances at his face, worry creeping in)(starts checking his pulse, breathing) Okay… you're breathing, and your pulse is steady… But why aren’t you waking up? Was this… what he was going to talk about? Falling asleep randomly?(sprinkles water on him) Hey. Wake up, Shiki. Come on… This doesn’t feel like a normal nap.
(quietly to herself) I should be freaking out right now. But that accident—maybe it really did something deeper…
(paces slightly, looks around the lab, searching for anything useful—then stops, clenches her fists) What do I do now…? From what he said, sleep is the main concern. Dreams are. So he should wake up on his own.
(sits beside him, voice low, emotional) It’s getting harder to see you like this, Shiki… I already watched you unconscious for days in that hospital bed. Don’t you think… it’s time to wake up?
Shiki (murmuring in his sleep, distressed): I—don’t—think—
Mana (grabs his shoulders, panicked): Shiki! Shiki! Wake up! Tell me what you don’t think! But tell me awake—please!
[Flashback fades, present returns]
Mana (softly, brushing a bit of hair from his face as he fully regains himself): …And that’s when you finally woke up.
Shiki (realizing, his voice low): Then… things are getting worse.
Mana (immediately concerned): What do you mean?
Shiki (takes a breath, then begins explaining everything he had told the other Mana in the dream world — the fossil museum conversation, the duplicate memories, the two versions of events, and how real it all felt)
Mana (stunned, trying to process): That’s… a lot to take in.(leans back slightly, as if the weight of it is physically pushing her)A dream that feels as real—maybe more real—than this world… And now your memories from those dreams are bleeding into this one?(pauses, visibly shaken)Shiki, that’s not just strange—that’s terrifying. Like... it’s not just a dream anymore, it’s something else. Something haunting.
Shiki (with a faint smirk, trying to lighten the mood): I knew you’d be able to understand this better than I could and make it more frightful. Statistically speaking, females are more emotionally adaptable than males.
Mana (fake-offended, rising to his bait with crossed arms): I know you’re trying to cheer me up… But if you keep using that method, the scariest thing you’ll be facing won’t be your dreams.
Shiki (awkwardly smiling): Okay, sorry!!
Mana (serious): So… what exactly has made it worse?
Shiki (tone shifting to serious): Well, at first I only dreamed when I chose to sleep—under my control. But now…  from what you told me..  it may just happen. Anytime. Anywhere.
Mana (growing concern, voice steady): You mean… you can fall asleep without warning? And dream those same hyper-real dreams? And even when someone tries to wake you—talking, water, shaking—you don’t respond?(pauses, bluntly) Yeah… that’s worse. Much worse.
Shiki (quietly): Yeah.
(They went silent for a while.)
 Mana (breaking the silence): So… what now?
Shiki (softly): Before all this—before I realized I could fall asleep anytime, anywhere—I had a plan.
Mana (curiously): And that was?
Shiki (softly): Well, the first step was telling you—which I’ve done. After that, I thought I could observe more about the dreams. Try to figure out the cause, how long they last… and maybe how to stop them. Whether it’s another world or just a side effect of the head injury… (Mana looks a little uneasy.) But…
Mana (still a little uneasy, but resolute): But what? You can still do all that, right?
Shiki (seriously): How? I fall asleep without warning—and worse, I don’t even realize it. I don’t know if I’m dreaming or awake, or if what I think I’m observing is even real. How can I study something when I don’t know if I’m even present?
Mana (realizing and sighing): Alright, no need to dance around it. Just say you want my help.
Shiki (grinning): No, I could never make you do that.
Mana (seriously): Okay then. I will.
Shiki (cutting in): If you’re insisting that much… How can I say no?
Mana (sighing): Even now, you’re fooling around. (Smiles, thinking to herself) Classic Shiki
Shiki (enthusiastically, eyes lighting up): Now we’re talking.
Mana (serious but with a hint of a smile): I know you want to experiment with whatever’s happening to you—and I know trying to stop you now is pointless. But listen: I’ll only help if you promise me something. If things get out of hand, we’re going straight to a doctor. No excuses.
Shiki (puffing out his cheeks childishly): Okay, I will. Promise.
Mana (sighs, tone soft but serious): I don’t know what’s really happening to you. Even after everything I’ve seen and heard, I still can’t fully believe that "experiencing different worlds" is actually possible... (clears her head and throat) But—I believe in you. And right now, that’s all the reason I need.
Shiki (silent for a beat, then grinning cheekily): Ohhh Mana, I didn’t know you were such a softie.
Mana (blushing, flustered, lightly punches his arm): Shut up.
[They rearrange the room for a focused discussion—clearing space, pulling chairs around, switching on the lights as the sun sets. A whiteboard is set up.] [They begin jotting down everything they know so far—clarity through structure.]
WHITEBOARD — PROJECT GENYUME
Sleep can occur anytime, anywhere (assumption)
While asleep, Shiki cannot be woken through normal means
Dreams during this sleep feel completely real, indistinguishable from waking life
Memories from dream and reality are merging
Cause — Unknown
Duration — Unknown
How to reverse it — Unknown
[They pause, both staring at the whiteboard. The sunset outside paints the lab glass in a soft amber glow. The room is calm but charged with a strange tension. Mana clicks the marker cap closed and steps back, arms crossed.]
Mana (studying the board): So… this is everything we know so far.
Shiki (nodding): Yeah. So I think the first thing we need to figure out is: what's the trigger?
Mana (bluntly): That’s your inner scientist talking. But I think the more important question is: how are we supposed to tell whether we’re in a dream—or a different world—from reality?
Shiki (understandingly): You’re right. A marker.
Mana: A reality marker.
Shiki (excited): Yeah! What should we do?[They fall silent, thinking.](grabbing a second marker, begins writing on the board while muttering): Something unique to this world… Something personal. We could share secrets? No, too unreliable… Maybe something written—yeah, on the body. Hand, maybe. Numbers. Yeah. Numbers.(turns to her, eyes lighting up) Mana, I got it.
Mana (sighs, amused): I heard you. Your monologue was leaking again, doofus.
Shiki (embarrassed): I did it again, huh…
Mana (smiling, supportive): But that’s actually genius. If you write down a number—say, on your hand—and check it in the dream, it’ll either be gone or different. Even if you’re in a different world entirely, the odds of two large, random numbers matching are basically zero. All thanks to the butterfly effect. And you and I can easily remember one number.
Shiki (suddenly realizing): Maybe that’s why I kept thinking about butterflies... Look at us, already solving mysteries.
[Mana gives a proud smile.]
Shiki (still riding the wave): But… using only one number might not be enough. There’s still a microscopic chance of a match.
Mana (puzzled, then catching on): So what— (pauses, then lights up) We use two numbers. And then link the second number to the first using some kind of formula. That way, even if the first is guessed or repeated, the second would never match up unless it’s the same reality. That makes it… basically impossible to fake.One number goes on my hand, the other on yours. That way, even over a call, we can confirm them instantly.
Shiki (grinning smugly): Now you get me, Assistant Mana.
Mana (playfully punches his shoulder): Don’t push your luck.
[They choose the first number: 7073828384, and a formula: (ones digit + last digit) × 1st number, then truncate to the number of digits of the 1st number from the ones digit. The second number: 7812112224]
Shiki (laughs, glancing at the board):This is nice. We haven’t done this in a long time.
Mana (writing, a little distracted):What?
Shiki (bluntly but fondly):This—experimenting, making hypotheses, scribbling nonsense on whiteboards. All the stuff we used to do back then.
Mana (still writing, faintly smiling):Hmm…
Shiki (more animated):Do you remember that one time I wanted to find out what happens when you point a laser at an eye?Mana (slows down a little, uneasiness creeping in)Shiki (oblivious to her discomfort, chuckling):We tried it on the dissected frog eye first, but it didn’t give any good results. So I was about to try it on my own eye—a low-power laser, of course.Mana (tense, pausing mid-write)Shiki (grinning):I knew it wouldn’t do any lasting damage, and deep down you knew it too—even if you were a bit hesitant. If it weren’t for Koma ratting us out to the professor, we probably would’ve gone through with it. Poor guy, even his tattling sounded like a whisper.(laughs again)Man… I miss those times.
Mana (quietly, still writing):Hmm...
Shiki (noticing):Hey, what are you writing?
(He glances. The whiteboard is covered in gibberish—random shapes, incomplete words, loops and numbers with no meaning.)
Mana (startled, blinking at it):Wh… What the—?
Shiki (joking):Whoa. You okay there, Assistant Mana? Or are you dreaming now?
Mana (acting strange): No, I’m o—
(She suddenly rushes to the bathroom and vomits into the sink. Shiki quickly follows.)
Shiki (very worried): Are… you okay?
Mana (still shocked, trying to recollect herself): Yeah…
Shiki (concerned): You don’t look ok. What just happened?
(Without answering, Mana hurries back to the lab, grabs her bag, and heads for the exit. Shiki follows, unsettled.)
Shiki (afraid): At least—
Mana (cutting in): I’m okay. Don’t worry. (dryly) And no—I’m not pregnant. We’ll talk tomorrow, at the same time. Be ready.
Shiki (a little shocked by the word “pregnant” and clearly concerned): Wh… What was that all about?(Trying to shake it off with a nervous chuckle) I mean… if she can joke about that, she’s probably okay… right?(Pauses, looks down at his hand) I’m not dreaming, am I?
[Checks his number—7073828384. Then quickly texts Mana to check hers. A moment later, she replies: 7812112224 Doofus]
Shiki (relieved at first): Okay… I’m not dreaming. That’s a relief—(Pauses, frowns) Wait. That’s not a relief. What just happened really was real.(Looks at the screen again)At least she sounds—or reads—normal.(Sighs, more serious) She’s more mature than me. Smarter too. At least she won’t do anything reckless…(Softly, to himself) …Which is a relief.
[He cleans up the lab, puts everything back in its place, turns off the lights, locks up, and heads back to his apartment.]
[Earlier — Mana’s POV, moments before she ran out]
[Shiki in the background, reminiscing]
Mana (thinking, faint smile while writing): We were so chaotic. Yeah… that time.
(Suddenly, a flash: Shiki’s accident—blood, the sharp noise, the panic. Her hand, stained red.) (Her marker slows)
Mana (thinking): Not now. If he finds out…
(She resumes writing—quicker, shakier.)
Shiki (chuckling, oblivious): Hey, what are you writing?
(She looks up—sees the board. It’s gibberish. Shapes. Numbers. Broken words.)
Mana (startled, blinking at it): Wh… What the—?
(Thinking, panicked) No—no. Not now. If this continues, he’ll figure it out—
(More flashes. Blood. Shiki, limp in her lap. His head split. Her hands trembling.)
A voice (inside, eerily like her own): You know it was your fault. If only you’d stopped him. If only you hadn’t made that mistake. If only you weren’t his friend.
(The images crescendo—blood, screams, guilt.)
Mana (acting strange): No, I’m o—
[She bolts from the lab.]
Mana (thinking, staggering into the bathroom): No… no…no.. noo (The voices and visions claw at her. She vomits into the sink. Her hands grip the edges. The noise fades. Her head clears slightly.)
[Behind her, Shiki’s voice—distant, worried.]
Shiki (from outside): Are… you okay?
Mana (still shocked, trying to recollect herself): Yeah…
Shiki (more concerned): You don’t look okay. What happened?
Mana (thinking, urgent): I can’t stay here. If I do, he’ll know.
[She rushes back in, grabs her bag.]
Shiki (afraid, trying to stop her): At least—!
Mana (still disoriented, thinking): Say something—something that’ll throw him off. Something weird enough to distract him.
Mana (blurting as she walks out): I’m okay—and no, I’m not pregnant.
[She disappears through the door.]
[A few minutes later. Shiki’s phone peeps. He reads the message:]
Text from Shiki: I think I’m dreaming. Can you tell me your number?
Mana (sees the text, still pale, but a tired smile forming):That really shook that doofus…
[She types back: 7812112224 Doofus]
Mana (walking to her apartment, suddenly stops): Oh no… (realizes) What if he fell asleep on the way home? (guiltily) Shit... I shouldn’t have left him alone like that.[She breaks into a run back toward him] (thinking)  I have to call him.
[She dials, but the phone reads: Currently busy]
Mana (worried): Did he try calling someone… and fall asleep?[She tries calling again]
[Shiki’s POV — after leaving the lab]
Shiki (walking slowly, hands in pockets): This week’s been strange... even for me. First, the dream—or whatever it was—about another world. Weird enough. Then seeing Mana vomiting and acting... off, talking about THAT.(He pauses, grimacing) The worst part? I can fall asleep anytime.(face paling) Oh no…thinking) I can’t afford to fall asleep on the road. My uncle’s already suspicious about me(hesitates) I should call Mana. But... she looked like she’s fighting her own demons. Better not make it worse.(thinking) Calling my uncle is risky... but less risky than him finding me unconscious on the street.
[He dials]
[On call, uncle in his car]
Shiki: Hello, Uncle.
Uncle: Hey, Shiki.
Shiki (calmly): Can you pick me up in front of the lab?
Uncle (calm but firm): What’s going on? You don’t usually ask for a ride.
Shiki (nervous, stumbling): Yeah, I—it's just...
Uncle (cutting in): You and lying don’t mix. What’s the matter?
Shiki (awkward): Ah... well…
Uncle (sighs):And you don’t lie unless you have to.
Shiki (hopefully): So…..
Uncle (sighing): I’m coming, but you better explain everything when I get there.
Shiki (relieved): Aye aye, Captain.
[Call ends]
Uncle (sighing as he turns the car toward the lab):That kid... How’s he gonna survive in this world?(pauses)Oh yeah. Destroying it is an option for him.
Shiki (noticing phone): Ten missed calls… Oh no, I’m dead. How did I not notice?
[He calls Mana]
Mana (picks up, panting, worried and angry): (shouting) ARE YOU OK?? WHO THE HELL WERE YOU TALKING TO THAT YOU DIDN’T NOTICE?!
Shiki (calm, almost robotic from sheer fear): First—yes, I’m okay. Second—I called Uncle to pick me up. (gulps)
Mana (exhales, flustered ): Oh... that makes sense. (abruptly) Okay, then. See you tomorrow.
[Cuts the call]
Shiki (confused and scared):What was that about...? 
[The next day]
Mana (entering the room):Oh, you are already here, I see.
Shiki (yawning):I was pretty bored, I hate summer.
Mana (dropping her bag):`
  },

  // ==========================================================================
  // 3. SHORT STORY: BOND BEYOND BOUNDARIES
  // ==========================================================================
  {
    id: "story-bond-beyond-boundaries",
    title: "Bond Beyond Boundaries",
    subtitle: "The Crow, The Bird & The Endless Loop",
    type: "shortstory",
    category: "Short Story",
    date: "August 2026",
    readTime: "4 min read",
    tag: "Short Story",
    coverImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    accentColor: "#c084fc",
    excerpt: "When a selfless bird shields a mischievous crow from a hunter's arrow, the crow's grief shakes the heavens. Granted the power by the God of Time to rewrite history, the crow loops through eternity trying to break an immutable fate.",
    lyrics: [
      "A mischievous crow and a bird whose kindness knew no boundaries.",
      "A sudden hunter, an unbearable sacrifice, and a cry that moved the divine.",
      "The God of Time offered a single candle of hope to rewrite history.",
      "Through infinite iterations, the bird's demise remained an immutable point.",
      "Though reality shattered and time stood still, the crow's resolve never wavered.",
      "The world does not matter if the one you love is not in it."
    ],
    pages: [
      {
        pageNumber: 1,
        chapter: "Part I · The Unbreakable Bond & The Hunter's Arrow",
        content: [
          "Once upon a time, in a picturesque landscape nestled near a tranquil pond, a delightful little bird enjoyed a blissful existence. In the neighboring tree, a mischievous crow had taken up residence. The bird, with its kind-hearted nature and affable demeanor, constantly extended a friendly wing towards the crow, despite the latter's cunning pranks and trickery.",
          "Time and again, the crow would play pranks on the innocent bird, undeterred by their continued friendship. Yet, the bird remained steadfast in its commitment to help the crow, even going so far as to provide nourishment during times of scarcity. Their bond seemed unbreakable.",
          "However, fate took an unexpected turn when a hunter appeared, his patience waning due to the crow's relentless annoyance. Observing the perilous situation, the bird's innate sense of selflessness took hold, and it courageously positioned itself in the hunter's path, sacrificing its own life to protect its troublesome friend.",
          "Devastated by the loss, the crow's emotions soared to an unimaginable height. Its cry, a symphony of pure agony and sorrow, resonated with the heavens, beckoning the attention of the divine. The gods themselves descended upon the crow, seeking to console it, but their efforts were in vain. The crow cried regardless, a cry so drenched in sorrow not only the world but even the Heavens were trembling also. The crow's anguish ran too deep, for the cry of loss possesses the power to move all beings to tears."
        ]
      },
      {
        pageNumber: 2,
        chapter: "Part II · The God of Time & The Thousand Iterations",
        content: [
          "Just then, the God of Time materialized before the inconsolable crow, presenting a glimmer of hope akin to a flickering candle in a dark cavern. With empathy in its celestial eyes, the deity advised the crow, revealing a chance to alter the course of events that had transpired. It was an opportunity to rewrite history.",
          "Embracing this newfound hope like a lifeline, the crow embarked on a journey through the annals of time, determined to prevent the hunter from ever crossing paths with the bird. Time and time again, the crow revisited the past, devising various strategies to keep the hunter at bay. Yet, despite its best efforts, fate conspired against them.",
          "In one attempt, the crow opted to avoid any interaction with the hunter, only to witness the tragic moment unfold as the bird fell victim to the hunter's relentless pursuit. In another, the crow sought to scare the hunter away, only to witness an unforeseen mishap—a random shot fired by the hunter, inadvertently claiming the bird's life. The fear of loss and sorrow of death engulfed the crow to a degree that he even tried to kill the hunter when he was a child, but it was all in vain as the bird died again and again.",
          "Undeterred by repeated failures, the crow delved further into the depths of time, contemplating every possible scenario. It even considered severing ties with the bird, blaming itself for the loss. Yet, the bird's unwavering kindness thwarted any attempts to keep their distance, inevitably leading to the same heart-breaking outcome."
        ]
      },
      {
        pageNumber: 3,
        chapter: "Part III · Love Beyond the Fabric of Existence",
        content: [
          "Time and time again, the crow returned to the past, desperate to find a solution. It tried fleeing from that fateful place, hoping distance would ensure the bird's survival, but destiny would not be swayed. The bird's demise persisted.",
          "Even when the crow ventured back to the earliest moments of creation, seeking to reshape the very fabric of existence, the bird's death remained an immutable point of absolute certainty. Despite the countless attempts and infinite iterations, the crow found itself trapped in an unyielding cycle.",
          "With each repetition, the crow's spirit endured, unyielding and unbroken. Though the world seemed frozen, its heart remained aflame with an unrelenting determination. The crow's desire to be reunited with its beloved friend surpassed the shattered reality and the cracks in the fabric of existence.",
          "The world may have remained stuck in a single moment, its inhabitants bound by an unchanging loop, but the crow paid no mind. For in its eyes, the only reality that mattered was the friendship it held dear. The crow's resilience never wavered, even as time lost its meaning and reality teetered on the edge.",
          "Through shattered time and fragmented reality, the crow's determination remained steadfast, an unwavering beacon of hope. It may have been a world stuck in an eternal loop, but the crow's unwavering love and unbreakable resolve propelled it forward, again and again, for the sake of its dear friend.",
          "In the face of a broken world, the crow's story serves as a testament to the power of love, bonds, loyalty, resilience, and the unwavering pursuit of friendship. It teaches us that even in the face of seemingly insurmountable challenges, the bonds we forge can inspire us to defy the very fabric of existence itself.",
          "Love has no bounds, no limits—it can transcend even space and time. The world doesn't matter if the one you love is not in it."
        ]
      }
    ],
    content: `Bond Beyond Boundaries
Once upon a time, in a picturesque landscape nestled near a tranquil pond, a delightful little bird enjoyed a blissful existence. In the neighboring tree, a mischievous crow had taken up residence. The bird, with its kind-hearted nature and affable demeanor, constantly extended a friendly wing towards the crow, despite the latter's cunning pranks and trickery.
Time and again, the crow would play pranks on the innocent bird, undeterred by their continued friendship. Yet, the bird remained steadfast in its commitment to help the crow, even going so far as to provide nourishment during times of scarcity. Their bond seemed unbreakable.
However, fate took an unexpected turn when a hunter appeared, his patience waning due to the crow's relentless annoyance. Observing the perilous situation, the bird's innate sense of selflessness took hold, and it courageously positioned itself in the hunter's path, sacrificing its own life to protect its troublesome friend.
Devastated by the loss, the crow's emotions soared to an unimaginable height. Its cry, a symphony of pure agony and sorrow, resonated with the heavens, beckoning the attention of the divine. The gods themselves descended upon the crow, seeking to console it, but their efforts were in vain. The crow cried regardless, a cry so drenched in sorrow not only the world but even the Heavens were trembling also. The crow's anguish ran too deep, for the cry of loss possesses the power to move all beings to tears.
Just then, the God of Time materialized before the inconsolable crow, presenting a glimmer of hope akin to a flickering candle in a dark cavern. With empathy in its celestial eyes, the deity advised the crow, revealing a chance to alter the course of events that had transpired. It was an opportunity to rewrite history.
Embracing this newfound hope like a lifeline, the crow embarked on a journey through the annals of time, determined to prevent the hunter from ever crossing paths with the bird. Time and time again, the crow revisited the past, devising various strategies to keep the hunter at bay. Yet, despite its best efforts, fate conspired against them.
In one attempt, the crow opted to avoid any interaction with the hunter, only to witness the tragic moment unfold as the bird fell victim to the hunter's relentless pursuit. In another, the crow sought to scare the hunter away, only to witness an unforeseen mishap—a random shot fired by the hunter, inadvertently claiming the bird's life. The fear of loss and sorrow of death engulfed the crow to a degree that he even tried to kill the hunter when he was a child, but it was all in vain as the bird died again and again.
Undeterred by repeated failures, the crow delved further into the depths of time, contemplating every possible scenario. It even considered severing ties with the bird, blaming itself for the loss. Yet, the bird's unwavering kindness thwarted any attempts to keep their distance, inevitably leading to the same heart-breaking outcome.
Time and time again, the crow returned to the past, desperate to find a solution. It tried fleeing from that fateful place, hoping distance would ensure the bird's survival, but destiny would not be swayed. The bird's demise persisted.
Even when the crow ventured back to the earliest moments of creation, seeking to reshape the very fabric of existence, the bird's death remained an immutable point of absolute certainty. Despite the countless attempts and infinite iterations, the crow found itself trapped in an unyielding cycle.
With each repetition, the crow's spirit endured, unyielding and unbroken. Though the world seemed frozen, its heart remained aflame with an unrelenting determination. The crow's desire to be reunited with its beloved friend surpassed the shattered reality and the cracks in the fabric of existence.
The world may have remained stuck in a single moment, its inhabitants bound by an unchanging loop, but the crow paid no mind. For in its eyes, the only reality that mattered was the friendship it held dear. The crow's resilience never wavered, even as time lost its meaning and reality teetered on the edge.
The world may have stagnated, yet the crow pressed on, unyielding in its pursuit. It had witnessed the bird's untimely demise countless times, yet it persevered, compelled by an indomitable spirit. With each repetition, the crow searched tirelessly for that one opportunity, that one chance to rewrite their intertwined fate.
Through shattered time and fragmented reality, the crow's determination remained steadfast, an unwavering beacon of hope. It may have been a world stuck in an eternal loop, but the crow's unwavering love and unbreakable resolve propelled it forward, again and again, for the sake of its dear friend.
In the face of a broken world, the crow's story serves as a testament to the power of love, bonds, loyalty, resilience, and the unwavering pursuit of friendship. It teaches us that even in the face of seemingly insurmountable challenges, the bonds we forge can inspire us to defy the very fabric of existence itself.
Love has no bounds, no limits—it can transcend even space and time. The world doesn't matter if the one you love is not in it.`
  },

  // ==========================================================================
  // 4. SHORT STORY: DAK... DAK... (THE OCEAN ABYSS)
  // ==========================================================================
  {
    id: "story-dak-dak-abyss",
    title: "Dak... Dak...",
    subtitle: "The Beating Heart & The Deep Sea Abyss",
    type: "shortstory",
    category: "Short Story",
    date: "July 2026",
    readTime: "3 min read",
    tag: "Short Story",
    coverImage: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80",
    accentColor: "#0ea5e9",
    excerpt: "Alone in a tempestuous sea after a shipwreck, as freezing waves drag you down, all physical strength is exhausted. Yet in the deep silence, your heart stubbornly beats: 'I beat because I love me; and I am you.'",
    lyrics: [
      "A small boat adrift in the vast expanse of a merciless ocean.",
      "The reaper's scythe disguised as towering, ferocious waves.",
      "Frozen limbs, slipping grip, and sinking down into the icy depths.",
      "Dak... Dak... In the silence, a rhythm refuses to die.",
      "'Why are you still beating?' — 'I beat because I love me; and I am you.'",
      "All life began in the sea, and in peaceful surrender, we return to it."
    ],
    pages: [
      {
        pageNumber: 1,
        chapter: "Part I · The Tempest & The Reaper's Scythe",
        content: [
          "Imagine being in a small boat, alone in the vast expanse of the ocean. A faint memory lingers from a shipwreck, and you find yourself drifting, embraced by the cold wind that rocks every bone in your body. Suddenly, the wind intensifies, and the waves grow wilder, as if nature itself is conspiring against you. With all your strength, you cling to the boat, and your gaze fixes upon a dark, menacing cloud on the horizon. It approaches slowly, like a reaper making its way toward its target, the scythe manifested in the relentless waves that surround you. The atmosphere becomes charged with an ominous energy, and you sense the impending turmoil.",
          "A colossal wave lifts you higher and higher, creating a surreal sensation as if you are being lifted to the heavens. Yet, the euphoria is short-lived, as the wave crashes down, flipping your small vessel. Panic sets in as you struggle to swim, desperately trying to regain control of the boat. Your cold surroundings numb your body, and the weather seems to perform a dance of sacrifice, as though demanding a toll for your presence in its domain.",
          "Your lower body loses sensation, breaths become heavy, and fatigue sets in. The boat becomes your lifeline, the only barrier standing between you and the icy grip of death. The waves, personifying the reaper's scythe, grow more ferocious, and you lose your grip. It's as if the angry waves are punishing you, making you realize the insignificance of your existence in the vastness of the ocean. The waves, with scythe-like ferocity, snatch the boat from your grasp, angrily punishing you for daring to challenge their might. The sea, like a vengeful deity, expresses its fury, leaving you vulnerable and at the mercy of its unpredictable temperament."
        ]
      },
      {
        pageNumber: 2,
        chapter: "Part II · Dak... Dak... & The Return to Eternal Silence",
        content: [
          "Suddenly, a strange calmness befalls the surroundings, as if nature has decided your fate. “Not worth doing extra you will die regardless.. might as well give you a moment of silence” you thought that would be the word if the world could speak. But the will to survive keeps you searching for the lost boat. You swim with the little strength you have left, trying desperately to find the lifeline. Now accepting the inevitable as your body weakens and your strength drains into the sea.",
          "A slow, deliberate descent begins. Your body has no energy left, and you're going down into the sea. The cold water numbs your hands and feet. But your heart, surprisingly, keeps beating, defying the call of surrender. “Why are you still beating?” you question in a silent plea, unsure where this newfound strength comes from. The silence surrounding you seems to wait for an eternal sleep, but a sound breaks through — Dak... Dak... your heart. “Why?” you ask again, amazed by its resilience. You've used every ounce of strength left, yet your heart refuses to yield.",
          "A sudden need to live. You don't know where that strength came from, but you flapped and went up above the water level. A shout pierces the silence, as if the god of thunder himself is furious, you shout: “Why are you still beating?!”",
          "A voice, soft yet resolute, echoes: “I beat because I love me; and I am you. But sadly, you are right. We are going to die.”",
          "In contrast to everything you've faced, tears flow now with an intensity that could fill the ocean. “Calm down,” your heart whispers to you, expressing gratitude for its unwavering rhythm. “Thanks for never stopping, for never stopping believing.”",
          "As you slowly descend into the sea, contemplating the journey, a reflection crosses your fading thoughts: “They say all life started from the sea, and we are going back to it.”",
          "The sense of every part of your body, or the lack of it, contributes to the silent communion with the eternal ocean. First your feet, then your hands. “This time I will not disturb the silence.” Then your heart.",
          "You don't know how, but your hands, now open wide, seem to welcome the inevitable. Slowly, your body descends deeper and deeper into the abyss. You ponder the events that transpired, contemplating life and its mysteries.",
          "In the final lines, your thoughts fade away, and you surrender to the eternal silence of the sea. The descent continues, slowly going deeper and deeper...",
          "— End"
        ]
      }
    ],
    content: `Imagine being in a small boat, alone in the vast expanse of the ocean. A faint memory lingers from a shipwreck, and you find yourself drifting, embraced by the cold wind that rocks every bone in your body. Suddenly, the wind intensifies, and the waves grow wilder, as if nature itself is conspiring against you. With all your strength, you cling to the boat, and your gaze fixes upon a dark, menacing cloud on the horizon. It approaches slowly, like a reaper making its way toward its target, the scythe manifested in the relentless waves that surround you. The atmosphere becomes charged with an ominous energy, and you sense the impending turmoil.
A colossal wave lifts you higher and higher, creating a surreal sensation as if you are being lifted to the heavens. Yet, the euphoria is short-lived, as the wave crashes down, flipping your small vessel. Panic sets in as you struggle to swim, desperately trying to regain control of the boat. Your cold surroundings numb your body, and the weather seems to perform a dance of sacrifice, as though demanding a toll for your presence in its domain.
Your lower body loses sensation, breaths become heavy, and fatigue sets in. The boat becomes your lifeline, the only barrier standing between you and the icy grip of death. The waves, personifying the reaper's scythe, grow more ferocious, and you lose your grip. It's as if the angry waves are punishing you, making you realize the insignificance of your existence in the vastness of the ocean. The waves, with scythe-like ferocity, snatch the boat from your grasp, angrily punishing you for daring to challenge their might. The sea, like a vengeful deity, expresses its fury, leaving you vulnerable and at the mercy of its unpredictable temperament.
Suddenly, a strange calmness befalls the surroundings, as if nature has decided your fate. “Not worth doing extra you will die regardless.. might as well give you a moment of silence” you thought that would be the word if the world could speak. But the will to survive keeps you searching for the lost boat. You swim with the little strength you have left, trying desperately to find the lifeline. Now accepting the inevitable as your body weakens and your strength drains into the sea. 
A slow, deliberate descent begins. Your body has no energy left, and you're going down into the sea. The cold water numbs your hands and feet. But Your heart, surprisingly, keeps beating, defying the call of surrender. "Why are you still beating?" you question in a silent plea, unsure where this newfound strength comes from. The silence surrounding you seems to wait for an eternal sleep, but a sound breaks through — Dak... Dak... your heart. "Why?" you ask again, amazed by its resilience. You've used every ounce of strength left, yet your heart refuses to yield. A sudden need to live. You don't know where that strength came but you flapped and went up above the water level. A shout pierces the silence, as if the god of thunder himself is furious, You shout “ why are you still beating”. A voice, soft yet resolute, echoes, "I beat because I love me; and I am you. But sadly, you are right. We are going to die." In contrast to everything you've faced, tears flow now with an intensity that could fill the ocean. "Calm down," heart whispers to you, expressing gratitude for its unwavering rhythm. "Thanks for never stopping, for never stop believing." As you slowly descend into the sea, contemplating the journey, a reflection crosses your fading thoughts, "They say all life started from the sea, and we are going back to it."
The sense of every part of your body, or the lack of it, contributes to the silent communion with the eternal ocean. First your feet, then your hand, “This time I will not disturb the silence” then you heart. You don't know how but your hands, now open wide, seem to welcome the inevitable. Slowly, your body descends deeper and deeper into the abyss. You ponder the events that transpired, contemplating life and its mysteries. In the final lines, your thoughts fade away, and you surrender to the eternal silence of the sea. The descent continues, slowly going deeper and deeper..
End`
  },

  // ==========================================================================
  // 5. POEM: WHISPERS OF DAWN
  // ==========================================================================
  {
    id: "poem-whispers-of-dawn",
    title: "Whispers of the Dawn",
    subtitle: "Optics, Silence & Ephemeral Dew",
    type: "poem",
    category: "Poem",
    date: "June 2026",
    readTime: "2 min read",
    tag: "Poem",
    coverImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    accentColor: "#f472b6",
    excerpt: "Before the sun claims the horizon, each droplet of dew holds a universe of refracted starlight—brief, fragile, and fiercely alive.",
    lyrics: [
      "In the frozen hour before the dawn awakes,",
      "A solitary droplet trembles on the petal's edge.",
      "Gathering scattered rays of violet and rose,",
      "It mirrors the heavens before the warmth consumes it.",
      "We too are brief flashes of conscious light,",
      "Daring to glow before the vast silence claims the shore."
    ],
    pages: [
      {
        pageNumber: 1,
        chapter: "Stanzas I & II · The Awakening Mist",
        content: [
          "The night surrenders without a sound,\nLeaving diamonds strewn across the ground.\nA single droplet on a dahlia's crest,\nHolds the entire morning sky at rest.",
          "In its curved glass, the violet rays collide,\nWith secrets the midnight river tried to hide.\nIt does not fear the rising golden beam,\nNor ask how long it has to dream."
        ]
      },
      {
        pageNumber: 2,
        chapter: "Stanza III · The Fleeting Light",
        content: [
          "We watch through lenses ground of cold quartz stone,\nWaiting in wetlands, patient and alone.\nTo catch the fraction of a second when\nThe universe exhales its breath again.",
          "Not every beauty is destined to endure,\nSome burn the brightest when their time is brief and pure.\nSo let the morning mist dissolve away—\nWe held the eternal, if only for today."
        ]
      }
    ],
    content: `The night surrenders without a sound,
Leaving diamonds strewn across the ground.
A single droplet on a dahlia's crest,
Holds the entire morning sky at rest.

In its curved glass, the violet rays collide,
With secrets the midnight river tried to hide.
It does not fear the rising golden beam,
Nor ask how long it has to dream.

We watch through lenses ground of cold quartz stone,
Waiting in wetlands, patient and alone.
To catch the fraction of a second when
The universe exhales its breath again.

Not every beauty is destined to endure,
Some burn the brightest when their time is brief and pure.
So let the morning mist dissolve away—
We held the eternal, if only for today.`
  },

  // ==========================================================================
  // 6. FIELD ESSAY: EDGE INTELLIGENCE & ACCESSIBILITY
  // ==========================================================================
  {
    id: "edge-intelligence-accessibility",
    title: "Edge Intelligence & The Dignity of Low Latency",
    subtitle: "On-Device Neural Inference for Assistive Mobility",
    type: "essay",
    category: "Essay",
    date: "March 2026",
    readTime: "4 min read",
    tag: "Applied AI",
    coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80",
    accentColor: "#38bdf8",
    excerpt: "Why assistive computer vision systems cannot rely on remote cloud calls: lessons from architecting on-device ONNX inference for the visually impaired.",
    lyrics: [
      "When building assistive navigation systems, latency is not an optimization metric.",
      "It is an uncompromising safety boundary in the physical world.",
      "A 400-millisecond cellular roundtrip can mean collision with an open utility barrier.",
      "With Via-Lux, the architectural constraint was absolute: zero cloud dependencies.",
      "Quantizing YOLO26n into lightweight ONNX Runtime formats running on mobile silicon.",
      "Achieving sub-45 millisecond end-to-end inference without network connectivity.",
      "Dignity is navigating a crowded world with independence, safety, and speed."
    ],
    pages: [
      {
        pageNumber: 1,
        chapter: "Section 1 · Latency as a Physical Safety Boundary",
        content: [
          "When building technology for physical navigation, latency is not an optimization metric—it is a safety boundary.",
          "If a blind person is walking along a city sidewalk, an obstacle alert delivered 400 milliseconds late due to a 4G cellular roundtrip can result in a collision with an open utility barrier or a moving vehicle.",
          "With Via-Lux, the technical constraint was absolute: zero cloud dependencies."
        ]
      },
      {
        pageNumber: 2,
        chapter: "Section 2 · On-Device ONNX & Directional Acoustics",
        content: [
          "By compiling and quantizing YOLO26n into ONNX Runtime formats running natively on mobile hardware, we reduced end-to-end inference to under 45 milliseconds.",
          "Coupled with a 3x3 spatial audio matrix, users receive directional acoustic warnings naturally positioned around their spatial field of awareness.",
          "True intelligence does not wait for a cloud roundtrip—it lives directly on the edge."
        ]
      }
    ],
    content: `When building technology for physical navigation, latency is not an optimization metric—it is a safety boundary. 

If a blind person is walking along a city sidewalk, an obstacle alert delivered 400 milliseconds late due to a 4G cellular roundtrip can result in a collision with an open utility barrier or a moving vehicle.

With **Via-Lux**, the technical constraint was absolute: *zero cloud dependencies*.

By compiling and quantizing YOLO26n into ONNX Runtime formats running natively on mobile hardware, we reduced end-to-end inference to under 45 milliseconds. Coupled with a 3x3 spatial audio matrix, users receive directional acoustic warnings naturally positioned around their spatial field of awareness.`
  },

  // ==========================================================================
  // 7. FIELD ESSAY: STAGECRAFT & SYSTEMS ARCHITECTURE
  // ==========================================================================
  {
    id: "orchestrating-creative-systems",
    title: "Stagecraft & Systems Architecture: 1,500+ Performers",
    subtitle: "Street Theatre & Resilient Engineering",
    type: "essay",
    category: "Essay",
    date: "February 2026",
    readTime: "5 min read",
    tag: "Creative Direction",
    coverImage: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1000&q=80",
    accentColor: "#f59e0b",
    excerpt: "What directing large-scale street theatre across 40 public venues taught me about fault tolerance, graceful degradation, and genuine human connection.",
    lyrics: [
      "Street theatre is the most uncompromising medium in human performance.",
      "No microphones. No velvet seats. No darkened halls to hide behind.",
      "Step into a crowded market square, and within fifteen seconds, voice arrests the crowd.",
      "Orchestrating Manthan Mahotsav across 40+ public venues with 1,500+ artists.",
      "Rule one: Graceful degradation when a sudden cloudburst hits an open stone plaza.",
      "Rule two: Emotional clarity over syntactic noise—heart before complexity."
    ],
    pages: [
      {
        pageNumber: 1,
        chapter: "Part I · The Crucible of Public Streets",
        content: [
          "Street theatre (Nukkad Natak) is the most uncompromising medium in human performance. There are no theater seats, no microphones, no dark halls. You step into a crowded market square, and within fifteen seconds, your voice and physical intent must arrest the attention of two hundred rushing commuters.",
          "Orchestrating Manthan Mahotsav across 40+ public venues with over 1,500 artists and mobilizing digital campaigns crossing 120M+ backtrack views taught me the identical principles that govern robust software architecture."
        ]
      },
      {
        pageNumber: 2,
        chapter: "Part II · Two Rules of Fault Tolerance",
        content: [
          "1. Graceful Degradation: When a cloudburst hits an open street venue or permits shift, the performance must adapt immediately without crashing.",
          "2. Emotional Clarity Over Syntactic Noise: The most sophisticated script fails if the audience cannot feel the core message. Similarly, elegant software is not measured by lines of code, but by the effortless clarity it gives the human using it."
        ]
      }
    ],
    content: `Street theatre (Nukkad Natak) is the most uncompromising medium in human performance. There are no theater seats, no microphones, no dark halls. You step into a crowded market square, and within fifteen seconds, your voice and physical intent must arrest the attention of two hundred rushing commuters.

Orchestrating **Manthan Mahotsav** across 40+ public venues with over 1,500 artists and mobilizing digital campaigns crossing 120M+ backtrack views taught me the identical principles that govern robust software architecture:

1. **Graceful Degradation**: When a cloudburst hits an open street venue or permits shift, the performance must adapt immediately without crashing.
2. **Emotional Clarity Over Syntactic Noise**: The most sophisticated script fails if the audience cannot feel the core message. Similarly, elegant software is not measured by lines of code, but by the effortless clarity it gives the human using it.`
  }
];
