
var cmdListTestMove = [
"//Commands must have a minimum of two levels. This will differentiate between comments, blank lines, etc.	",
"0		| spawn	| 100 	| 324 	| visual:en3,hp:1",
"1000 	| moveToBy 	| 100 	| 400",
"2000 	| moveToBy 	| 200 	| 350",
"3000 	| moveToBy 	| 300 	| 300",
"4000 	| moveToBy 	| 400 	| 250",
"5000 	| moveToBy 	| 500 	| 200",
"6000 	| moveToBy 	| 600 	| 150",
"7000 	| moveToBy 	| 700 	| 100",
"8000 	| moveToBy 	| 500 	| 200",
"9000 	| moveToBy 	| 100 	| 300",
"2000	| spawn	| 150 	| 75 	| visual:en1,hp:1",
"3000 	| haltUntil",
"9000 	| moveToBy 	| 600 	| 100",
"3000	| spawn	| 200 	| 23 	| visual:en3,hp:1",
"4000 	| haltUntil",
"9000 	| moveToBy 	| 600 	| 100",
"4000	| spawn	| 250 	| 123 	| visual:en1,hp:1",
"5000 	| haltUntil",
"9000 	| moveToBy 	| 600 	| 200",
"5000	| spawn	| 300 	| 246 	| visual:en3,hp:1",
"6000 	| haltUntil",
"9000 	| moveToBy 	| 600 	| 300",
"6000	| spawn	| 350 	| 342 	| visual:en1,hp:1",
"7000 	| haltUntil",
"9000 	| moveToBy 	| 600 	| 400",
"7000	| spawn	| 400 	| 312 	| visual:en3,hp:1",
"8000 	| haltUntil",
"9000 	| moveToBy 	| 600 	| 400",
"8000	| spawn	| 450 	| 176 	| visual:en2,hp:1",
"9000 	| haltUntil",
"11000 	| moveToBy 	| 600 	| 200",
"15000 	| dieAt "
];