/* ***************************************************************************** */
/* 美佳の英文タイプトレーナー テキスト練習編 JAVASCRIPT版ソースコード Ver2.02.01 */
/*                                          						             */
/*                                           Copy right 今村二朗 2023/9/8        */
/*                                                                               */
/* このソースコードは 改変、転載、他ソフトの使用など自由にお使いください         */
/*                                                                               */
/* 注意事項                                                                      */
/*                                                                               */
/* グラフィック表示は640x400ドットの仮想画面に行い実座標に変換して表示してい     */
/* ます。                                                                        */
/*                                                                               */
/* JAVASCRIPTでは横軸がX座標、縦軸がY座標ですがこのソースコードでは横軸がY座標   */
/* 縦軸がX座標です。                                                             */
/*                                                                               */
/* ***************************************************************************** */
MIKA_cookie=0; /* クッキー 読み込み変数 */
MIKA_code='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; /* クッキー書き込み用62進数文字列テーブル */
MIKA_cookie_array0=new Array(100); /* クッキー読み込み配列 */
MIKA_cookie_array1=new Object(); /* クッキー読み込み連想配列 */
MIKA_max_c_line=0; /* 練習テキスト 行数 */
MIKA_start_text_line=86; /* 練習テキスト表示 開始 x 座標 */
MIKA_double_text_hight=40; /* 練習テキスト表示の 行間隔 x座標 */
MIKA_rensyu_text_hight=18; /* 文字入力エリアの行間隔 x座標 */
MIKA_max_text_line=8; /* 練習テキスト表示 最大行数 */
MIKA_kugiri_text_line=83; /* 練習テキストと練習記録表示の区切線の x座標 */
MIKA_current_point_x=1; /* 練習テキストの入力行の位置*/
MIKA_scroll_point=1; /* 画面スクロール表示の開始行位置 */
MIKA_text_point_x=0; /* 文字入力カーソル縦行位置*/
MIKA_text_point_y=0; /* 文字入力カーソル横文字位置 */
MIKA_err_count=0; /* エラー文字表示文字数 */
MIKA_text_time_interval=1000; /* 入力速度表示用のタイマーのミリ秒間隔 */
MIKA_err_c_table=new Array(256); /* エラー文字保存エリア */ 
MIKA_disp_cursor_flag=1; /* カーソル表示フラグ */
MIKA_Procttimer=0; /* 入力速度表示用タイマー */
MIKA_sec_count=0; /* 入力速度表示用 秒カウンター */
MIKA_type_date=0; /* 最高速度達成日 一時保存エリア */
MIKA_rt_t=0; /* 成績表示用合計累積練習時間  秒 */
	MIKA_t_date= /* 最高速度達成日付 */
	[
		"        ",
		"        ",
		"        ",
		"        ",
		"        ",
		"        "
	];
	MIKA_t_speed= /* 最高速度記録 文字数／秒 */
	[
		0.0,0.0,0.0,0.0,0.0,0.0
	
	];
	MIKA_tw_speed= /* 最高速度記録 ワード／秒 */
	[
		0.0,0.0,0.0,0.0,0.0,0.0
	];
	MIKA_t_time= /* 累積練習時間 秒 */
	[
		0,0,0,0,0,0
	];
	MIKA_t_kaisu= /* 練習回数 */
	[
		0,0,0,0,0,0
	];
	MIKA_t_mojisu= /* 練習テキスト 文字数 */
	[
		0,0,0,0,0,0
	];
MIKA_p_count=null; /* 練習回数配列 アドレス */
MIKA_magenta='RGB(128,32,128)'; /* 濃いめのマゼンタ */
MIKA_green='RGB(0,128,0)'; /* 濃いめのグリーン */
MIKA_blue='RGB(0,0,128)'; /* 濃いめの青 */
MIKA_cyan='RGB(0,128,128)'; /* 濃いめのシアン */
MIKA_orange='RGB(128,32,0)'; /* 濃いめのオレンジ */
MIKA_red='RGB(128,0,0)'; /* 濃いめの赤 */
MIKA_bk_color='RGB(255,255,255)'; /* 背景の色 */
MIKA_key_black='RGB(0,0,0)'; /* 黒色 */
MIKA_key_gray='RGB(127,127,127)'; /* グレー */
MIKA_key_magenta='RGB(255,0,255)'; /* マゼンタ */
MIKA_key_blue='RGB(0,0,255)'; /* ブルー */
MIKA_key_red='RGB(255,0,0)'; /* 赤色 */
MIKA_color_text_under_line='RGB(0,0,255)'; /* アンダーラインの色 */
MIKA_color_cursor='RGB(0,0,0)'; /* カーソルの色 */
MIKA_color_text_err='RGB(255,0,0)'; /* エラー文字の背景色 */
MIKA_type_kind_mes=0; /* 練習項目名 */
MIKA_type_speed_record=0; /* 最高速度記録 文字数／分 配列アドレス */
MIKA_type_word_speed_record=0; /* 最高速度記録 ワード／分 配列アドレス */
MIKA_type_date_record=0; /* 最高速度達成日配列アドレス */
MIKA_type_time_record=0; /* 累積練習時間配列 アドレス */
MIKA_type_start_time = 0; /* 練習開始時間 ミリ秒 */
MIKA_type_end_time = 0; /* 練習終了時間 ミリ秒 */
MIKA_type_speed_time = 0.0; /* 練習経過時間 秒 */
MIKA_ttype_speed_time=0.0; /* 今回 練習経過時間 秒 */
MIKA_type_speed=0.0; /* 練習テキストの入力速度  文字数／分 */
MIKA_type_word_speed=0.0; /* 練習テキストの入力速度 ワード／分 */
MIKA_utikiri_flag=0; /* 練習テキスト打ち切りフラグ =1 全練習テキスト打ち切りによる終了 =0 入力練習中 */
MIKA_utikiri_flag2=0; /*  前回速度表示時の打ち切りフラグの値 */
MIKA_type_syuryou_flag=0; /* 練習終了時の記録更新フラグ =0 更新せず =1 前回の入力速度が0.0の時の記録更新 =2 前回の記録が0.0より大きい時の記録更新 */
MIKA_key_char=0; /* 練習文字 */
MIKA_type_count=0; /* 入力文字数カウンター */
MIKA_type_err_count=0; /* エラー入力文字数カウンター */
MIKA_time_start_flag=0; /* 時間計測開始フラグ =0 開始前 =1 測定中 */
MIKA_max_x_flag = 0;/* 画面表示 縦行数モード =0 25行 =1 20行 */
MIKA_max_y_flag = 0;/* 画面表示 横文半角カラム数モード =0 80カラム =1 64カラム */
MIKA_width_x=16; /* 全角文字 半角文字 縦方向ドット数 */
MIKA_width_y=8; /* 半角文字 横方向ドット数 */
MIKA_practice_end_flag=0; /* 練習実行中フラグ =0 練習中 =1 終了中 ESCによる終了も含む */
MIKA_mes0="●●  美佳の英文タイプトレーナ テキスト練習編  Ver2.02.01  ●●";
MIKA_mesta="●● 美佳タイプ テキスト練習編 %s ●●";
MIKA_mest2="練習テキスト                    文字数   最高速度    達成日    累積練習時間 回数";
MIKA_mest3="                                       字(ワード)/分";
MIKA_mesi1="もう一度練習するときはリターンキーまたは、Enterキーを押してください";
MIKA_mesi2="メニューに戻るときはESCキーを押してください";
MIKA_mesi3="おめでとう、記録を更新しました";
MIKA_abort_mes="ESCキーを押すと中断します";
MIKA_return_mes="ESCキーを押すとメニューに戻ります";
MIKA_menu_mes_s=[ /* 初期メニュー メニュー項目 */
		"練習テキスト１",
		"練習テキスト２",
		"練習テキスト３",
		"練習テキスト４",
		"練習テキスト５",
		"練習テキスト６",
		"成績表示",
		"成績消去",
	];
MIKA_ti_text=[ /* 練習テキスト表題 格納エリア */
		"テキスト１",
		"テキスト２",
		"テキスト３",
		"テキスト４",
		"テキスト５",
		"テキスト６",
	];
MIKA_menu_cord_s=[ /* 初期 メニュー項目表示位置 x座標 y座標 */
		[3*14,16*8],
		[5*14,16*8],
		[7*14,16*8],
		[9*14,16*8],
		[11*14,16*8],
		[13*14,16*8],
		[15*14,16*8],
		[18*14,16*8]
	];
MIKA_menu_s_sel_flag=[ /* 初期メニュー メニュー項目選択フラグ */
		0,0,0,0,0,0,0,0];
MIKA_menu_s_function=[ /* 初期メニュー 機能番号 */
		1101,1102,1103,1104,1105,1106,19,20];
MIKA_exec_func_no=1; /* メニューの機能番号 */
MIKA_type_kind_no=0; /* 練習項目番号 */
MIKA_menu_function_table=0; /* メニューの機能番号テーブルアドレス */
MIKA_sel_flag=0; /* 前回選択メニュー項目選択フラグアドレス */
MIKA_cookie_kind=0; /* クッキー種別 ='T' */
MIKA_mes_del_flag=0; /* 文字表示消去フラグ =1 色指定を背景色にしたとき =0 色指定を背景色以外にしたとき */
MIKA_win_size_width=960; /* ウィンドーサイズ横 */
MIKA_win_size_height=600; /* ウィンドーサイズ縦 */
MIKA_c_line1=[
"オズの魔法使い",
" Dorothy lived in the midst of the great Kansas prairies,",
"with Uncle Henry, who was a farmer, and Aunt Em, who was",
"the farmer's wife. Their house was small, for the lumber",
"to build it had to be carried by wagon many miles. There",
"were four walls, a floor and a roof, which made one room;",
"and this room contained rusty looking cooking stove, a",
"cupboard for the dishes, a table, three or four chairs,",
"and the beds. Uncle Henry and Aunt Em had a big bed in one",
"corner, and Dorothy a little bed in another corner. There",
"was no garret at all, and no cellar-except small hole, dug",
"in the ground, called a cyclone cellar, where the family",
"could go in case one of those great whirlwinds arose,",
"mighty enough to crush any building in its path. It was",
"reached by a trap door in the middle of the floor, from",
"which a ladder led down into the small, dark hole.",
" When Dorothy stood in the doorway and looked around, she",
"could see nothing but the great gray prairie on every",
"side. Not a tree nor a house broke the broad sweep of flat",
"country that reached the edge of the sky in all",
"directions. The sun had baked the plowed land into a gray",
"mass, with little cracks running through it. Even the",
"grass was not green, for the sun had burned the tops of",
"the long blades until they were the same gray color to be",
"seen elsewhere. Once the house had been painted, but the",
"sun blistered the paint and the rains washed it away, and",
"now the house was as dull and gray as everything else.",
" When Aunt Em came there to live she was a young, pretty",
"wife. The sun and wind had changed her, too. They had",
"taken the sparkle from her eyes and left them a sober",
"gray; they had taken the red from her cheeks and lips, and",
"they were gray also. She was thin and gaunt, and never",
"smiled now. When Dorothy, who was an orphan, first came to",
"her, Aunt Em had been so startled by the child's laughter",
"that she would scream and press her hand upon her heart",
"whenever Dorothy's merry voice reached her ears; and she",
"still looked at the little girl with wonder that she could",
"find anything to laugh at."
];
MIKA_c_line2=[
"不思議の国のアリス",
" Alice was beginning to get very tired of sitting by her",
"sister on the bank, and of having nothing to do: once or",
"twice she had peeped into the book her sister was reading,",
"but it had no pictures or conversations in it, \"and what",
"is the use of a book,\" thought Alice, \"without pictures or",
"conversation?\"",
" So she was considering in her own mind(as well as she",
"could, for the hot day made her feel very sleepy and",
"stupid), whether the pleasure of making a daisychain would",
"be worth the trouble of getting up and picking the",
"daisies, when suddenly a White Rabbit with pink eyes ran",
"close by her.",
" There was nothing so very remarkable in that; nor did",
"Alice think it so very much out of the way to hear the",
"Rabbit say to itself, \"Oh dear! Oh dear! I shall be too",
"late!\"(when she thought it over afterwards, it occurred to",
"her that she ought to have wondered at this, but at the",
"time it all seemed quite natural); but when the Rabbit",
"actually took a watch out of its waistcoat-pocket, and",
"looked at it, and then hurried on, Alice started to her",
"feet, for it flashed across her mind that she had never",
"before seen a rabbit with either a waistcoat-pocket, or a",
"watch to take out of it, and burning with curiosity, she",
"ran across the field after it, and fortunately was just in",
"time to see it pop down a large rabbit-hole under the",
"hedge.",
" In another moment down went Alice after it, never once",
"considering how in the world she was to get out again.",
" The rabbit-hole went straight on like a tunnel for some",
"way, and then dipped suddenly down, so suddenly that Alice",
"had not a moment to think about stopping herself before",
"she found herself falling down a very deep well.",
" Either the well was very deep, or she fell very slowly,",
"for she had plenty of time as she went down to look about",
"her, and to wonder what was going to happen next. First,",
"she tried to look down and make out what she was coming",
"to, but it was too dark to see anything; then she looked",
"at the sides of the well, and noticed that they were",
"filled with cupboards and book-shelves: here and there she",
"saw maps and pictures hung upon pegs. She took down a jar",
"from one of the shelves as she passed; it was labelled",
"\"ORANGE MARMALADE\", but to her great disappointment it was",
"empty: she did not like to drop the jar for fear of",
"killing somebody, so managed to put it into one of the",
"cupboards as she fell past it."
];
MIKA_c_line3=[
"鏡の国のアリス",
" One thing was certain, that the white kitten had had",
"nothing to do with it:-it was the black kitten's fault",
"entirely. For the white kitten had been having its face",
"washed by the old cat for the last quarter of an hour (and",
"bearing it pretty well, considering); so you see that it",
"couldn't have had any hand in the mischief.",
" The way Dinah washed her children's faces was this:",
"first she held the poor thing down by its ear with one",
"paw, and then with the other paw she rubbed its face all",
"over, the wrong way, beginning at the nose: and just now,",
"as I said, she was hard at work on the white kitten, which",
"was lying quite still and trying to purr- no doubt feeling",
"that it was all meant for its good.",
" But the black kitten had been finished with earlier in",
"the afternoon, and so, while Alice was sitting curled up",
"in a corner of the great arm-chair, half talking to",
"herself and half asleep, the kitten had been having a",
"grand game of romps with the ball of worsted Alice had",
"been trying to wind up, and had beer rolling it up and",
"down till it had all come undone again; and there it was,",
"spread over the hearthrug, all knots and tangles, with the",
"kitten running after its own tail in the middle.",
" \"Oh, you wicked wicked little thing!\" cried Alice,",
"catching up the kitten, and giving it a little kiss to",
"make it understand that it was in disgrace. \"Really, Dinah",
"ought to have taught you better manners! You ought, Dinah,",
"you know you ought!\" she added, looking reproachfully at",
"the old cat, and speaking in as cross a voice as she could",
"manage- and then she scrambled back into the arm-chair,",
"taking the kitten and the worsted with her, and began",
"winding up the ball again. But she didn't get on very",
"fast, as she was talking all the time sometimes to the",
"kitten, and sometimes to herself. Kitty sat very demurely",
"on her knee, pretending to watch the progress of the",
"winding, and now and then putting out one paw and gently",
"touching the ball, as if it would be glad to help if it",
"might."
];
MIKA_c_line4=[
"若草物語",
" \"Christmas won't be Christmas without any presents,\"",
"grumbled Jo, lying on the rug.",
" \"It's so dreadful to be poor!\" sighed Meg, looking down",
"at her old dress.",
" \"I don't think it's fair for some girls to have plenty",
"of pretty things, and other girls nothing at all,\" added",
"little Amy, with an injured sniff.",
" \"We've got father and mother and each other,\" said Beth,",
"contentedly, from her corner.",
" The four young faces on which the firelight shone",
"brightened at the cheerful words, but darkened again as Jo",
"said sadly:",
" \"We haven't got father, and shall not have him for a",
"long time.\" She didn't say \"perhaps never\", but each",
"silently added it, thinking of father far away, where the",
"fighting was.",
" Nobody spoke for a minute; then Meg said in an altered",
"tone:",
" \"You know the reason mother proposed not having any",
"presents this Christmas was because it is going to be a",
"hard winter for everyone; and she thinks we ought not to",
"spend money for pleasure when our men are suffering so in",
"the army. We can't do much, but we can make our little",
"sacrifices, and ought to do it gladly. But I am afraid I",
"don't\"; and Meg shook her head, and she thought",
"regretfully of all the pretty things she wanted.",
" \"But I don't think the little we should spend would do",
"any good. We've each got a dollar, and the army wouldn't",
"be much helped by our giving that. I agree not to expect",
"anything from mother or you, but I do want to buy Undine",
"and Sintram for myself; I've wanted it so long,\" said Jo,",
"who was a bookworm.",
" \"I planned to spend mine on new music,\" said Beth, with",
"a little sigh, which no one heard but hearth-brush and",
"kettle-holder.",
" \"I shall get a nice box of Faber's drawing pencils; I",
"really need them,\" said Amy, decidedly.",
" \"Mother didn't say anything about our money, and she",
"won't wish us to give up everything. Let's each buy what",
"we want, and have a little fun; I'm sure we work hard",
"enough to earn it,\" cried Jo, examining the heels of her",
"shoes in a gentlemanly manner.",
" \"I know I do - teaching those tiresome children nearly",
"all day when I am longing to enjoy myself at home,\" began",
"Meg, in the complaining tone again."
];
MIKA_c_line5=[
"足長おじさん",
" The first Wednesday in every month was a Perfectly Awful",
"Day-a day to be awaited with dread, endured with courage,",
"and forgotten with haste. Every floor must be spotless,",
"every chair dustless, and every bed without a wrinkle.",
"Ninety-seven squirming little orphans must be scrubbed and",
"combed and buttoned into freshly starched ginghams; and",
"all ninety-seven reminded of their manners, and told to",
"say \"Yes, sir,\" \"No, sir,\" whenever a trustee spoke.",
" It was a distressing time; and poor Jerusha Abbott,",
"being the oldest orphan, had to bear the brunt of it. But",
"this particular first Wednesday, like its predecessors,",
"finally dragged itself to a close. Jerusha escaped from",
"the pantry where she had been making sandwiches for the",
"asylum's guests, and turned upstairs to accomplish her",
"regular work. Her special care was room F, where eleven",
"little tots, from four to seven, occupied eleven little",
"cots set in a row. Jerusha assembled her charges,",
"straightened their rumpled frocks, wiped their noses, and",
"started them in an orderly and willing line toward the",
"dining room to engage themselves for a blessed half hour",
"with bread and milk and prune pudding.",
" Then she dropped down on the window seat and leaned",
"throbbing temples against the cool glass. She had been on",
"her feet since five that morning doing everybody's",
"bidding, scolded and hurried by a nervous matron. Mrs.",
"Lippett, behind the scenes, did not always maintain that",
"calm and pompous dignity with which she faced an audience",
"of trustees and lady visitors. Jerusha gazed out across a",
"broad stretch of frozen lawn, beyond the tall iron paling",
"that marked the confines of the asylum, down undulating",
"ridges sprinkled with country estates, to the spires of",
"the village rising from the midst of bare trees.",
" The day was ended-quite successfully, so far as she",
"knew. The trustees and the visiting committee had made",
"their rounds, and read their reports, and drunk their tea,",
"and now were hurrying home to their own cheerful",
"firesides, to forget their bothersome little charges for",
"another month. Jerusha leaned forward watching with",
"curiosity -and a touch of wistfulness- the stream of",
"carriages and automobiles that rolled out of the asylum",
"gates. In imagination she followed first one equipage then",
"another to the big houses dotted along the hillside. She",
"pictured herself in a fur coat and a velvet hat trimmed",
"with feathers leaning back in the seat and nonchalantly",
"murmuring \"Home\" to the driver. But on the doorsill of her",
"home the picture grew blurred."
];
MIKA_c_line6=[
"幸福な王子",
" High above the city, on a tall column, stood the statue",
"of the Happy Prince. He was gilded all over with thin",
"leaves of fine gold, for eyes he had two bright sapphires,",
"and a large red ruby glowed on his sword-hilt.",
" He was very much admired indeed. \"He is as beautiful as",
"a weathercock,\" remarked one of the Town Councillors who",
"wished to gain a reputation for having artistic tastes;",
"\"only not quite so useful,\" he added, fearing lest people",
"should think him unpractical, which he really was not.",
" \"Why can't you be like the Happy Prince?\" asked a",
"sensible mother of her little boy who was crying for the",
"moon. \"The Happy Prince never dreams of crying for",
"anything.\"",
" \"I am glad there is someone in the world who is quite",
"happy,\" muttered a disappointed man as he gazed at the",
"wonderful statue.",
" \"He looks just like an angel,\" said the Charity Children",
"as they came out of the cathedral in their bright scarlet",
"cloaks and their clean white pinafores.",
" \"How do you know?\" said the Mathematical Master, \"you",
"have never seen one.\"",
" \"Ah! but we have, in our dreams,\" answered the children;",
"and the Mathematical Master frowned and looked very",
"severe, for he did not approve of children dreaming.",
" One night there flew over the city a little Swallow. His",
"friends had gone away to Egypt six weeks before, but he",
"had stayed behind, for he was in love with the most",
"beautiful Reed. He had met her early in the spring as he",
"was flying down the river after a big yellow moth, and had",
"been so attracted by her slender waist that he had stopped",
"to talk to her.",
" \"Shall I love you?\" said the Swallow, who liked to come",
"to the point at once, and the Reed made him a low bow. So",
"he flew round and round her, touching the water with his",
"wings, and making silver ripples. This was his courtship,",
"and it lasted all through the summer.",
" \"It is a ridiculous attachment,\" twittered the other",
"Swallows; \"she has no money, and far too many relations\";",
"and indeed the river was quite full of Reeds. Then, when",
"the autumn came they all flew away."
];
MIKA_c_line_table=[MIKA_c_line1,MIKA_c_line2,MIKA_c_line3,MIKA_c_line4,MIKA_c_line5,MIKA_c_line6]; /* 練習テキストテーブル */
addEventListener( "keydown", keydownfunction ); /* キーダウン処理追加 */
window.onload = function() {
 const MIKATEXT = document.getElementById("MIKATEXT"); /* MIKATEXT キャンバス取得 */
    if (MIKATEXT.getContext) { /* MIKATEXT キャンバスが存在した場合 */
      const g = MIKATEXT.getContext("2d",{willReadFrequently: true});//2次元描画
		MIKA_win_size_width=MIKATEXT.width; /* 表示ウィンドー横サイズ取得 */
		MIKA_win_size_height=MIKATEXT.height; /* 表示ウィンド縦サイズ取得 */
		read_file_title(); /* 練習テキスト表題設定 */
		readcookie(); /* クッキー読み込み */
		convcookie(); /* クッキーを練習成績に変換 */
		MIKA_rt_t=seisekiruiseki(); /* 累積練習時間の合計を取得 */
		dispmen(g); /* 初期メニュー表示 */
		}
}
function keydownfunction(event) /* キーダウン処理 */
{
	const MIKATEXT = document.getElementById("MIKATEXT"); /* MIKAMUGU キャンバス取得 */
 	if (MIKATEXT.getContext) { /* MIKATEXTのキャンバスが存在した場合 */
    	const g = MIKATEXT.getContext("2d",{willReadFrequently: true}); /* 2次元描画 */
		nChar=event.key; /* キーを取得 */
		if(nChar=='Enter') nChar=0x0d; /* Enterキーが押されたときは文字記号を 0x0d に設定 */
		else if(nChar=='Escape') nChar=0x1b; /* Ecsapeキーが押されたときは文字記号を 0x1b に設定 */
		else if(nChar=='Backspace') nChar=0x08; /* Ecsapeキーが押されたときは文字記号を 0x08 に設定 */
		if(nChar==0x0d||nChar==0x1b||nChar==0x08||nChar.length==1) /* 入力された文字がEnter かEscape か Backspace か一文字の時に処理を実行 */
		{
			exec_func(g,nChar);	/* 入力文字に対応した処理を実行 */
		}
	}
}
function read_file_title() /* 練習テキストファイル 表題読み込み */
	{
		var i;
		var a;
		for(i=0;i<6;i++)
		{
			MIKA_ti_text[i]=MIKA_c_line_table[i][0]; /* 練習テキストの表題を取得 */
		}
		for(i=0;i<6;i++)
		{
			a=MIKA_menu_mes_s[i]+"  "+MIKA_ti_text[i]; /* 練習テキストの表題をメニュー表示項目に追加 */
			MIKA_menu_mes_s[i]=a;
		}
	}
function tconv(time) /* 練習時間秒を文字列に変換 */
	{
		var a;
		a=t0conv(time,0); /* 練習時間秒を "%5d時間%2d分%2d秒"のフォーマットで文字列に変換 */
		return a;
	}
function t0conv(time,flag) /* 練習時間秒をフォーマットを指定して文字列に変換 */
	{
		var a;
		var t1,t2,t3;
		t3=time%60; /* 秒を計算 */
		t3=formatd(t3,2); /* 秒を文字列に変換 */
		time=Math.floor(time/60);
		t2=time%60; /* 分を計算 */
		t2=formatd(t2,2); /* 分を文字列に変換 */
		t1=Math.floor(time/60); /* 時間を計算 */
		t1=formatd(t1,5); /* 時間を文字列に変換 */
		a=t1+"時間"+t2+"分"+t3+"秒";
		return a;
	}
function cfind(a,line) /* 文字列から指定の文字の位置を検索する */
{
	var ii,jj;
	jj = line.length; /* 文字列長取得 */
	for (ii = 0;ii < 1000 && ii < jj;ii++)
	{
		if (a == line[ii]) /* 文字列から指定の文字と一致する文字が見つかった場合 */
		{
			return(ii + 1);
		}
	}
	return(0); /* 一致する文字が見つからない場合 */
}
function stringlength(a) /* 文字列長を半角文字=1 全角文字 =2 で計算する */
	{
		var i,ii,length;
		length=a.length; /* 文字列長取得 */
		ii=0;
		for(i=0;i<length;i++)
		{
			ii=ii+charlength(a.charAt(i)); /* i番目の文字長を加算 */
		}
		return ii;
	}	
function charlength(a) /* 文字が半角文字か全角文字かの判定を行う リターン値 半角=1 全角 =2 */
	{
		var i;
		var aa;
//		System.out.printf("a=%1c code=%d\n",a,(int)a);
		aa=a.charCodeAt(0);
		if(aa<255) i=1; /* 半角英数の場合 */
		else if(0xff61<=aa&&aa<=0xff9f) i=1; /* 半角カナ文字の場合 */
		else i=2; /* 半角英数 半角カナ文字以外の場合 */
		return i;
	}
function cslclr(g) /* 画面クリア */
{
	g.fillStyle=MIKA_bk_color; /* 表示色に背景色を設定 */
	g.fillRect(0,0,MIKA_win_size_width,MIKA_win_size_height); /* 背景色で画面クリア */
}
function cslcolor(g,color) /* 表示色を設定 */
{
	if(color==MIKA_bk_color) MIKA_mes_del_flag=1; /* 表示色が背景色の時は文字表示消去フラグを=1に設定 */
	else MIKA_mes_del_flag=0; /* 表示色が背景色以外の時は文字表示消去フラグを=0に設定 */
	g.fillStyle=color; /* 塗りつぶし色指定 */
	g.strokeStyle=color; /* 線描画色指定 */
}
function cslputscale(g,x1,y1,mes,scale) /* 仮想座標から実座標に変換して文字列を指定の倍率で表示 */
{
 	var font_size,font_width,font_height;
	var xx1,yy1;
	var xx,yy;
	var ffont_size;
	var measrure;
	var textwidth;
	var text_color;
	var h1,h2;
	font_size=cslfontsize(scale); /* 文字フォントサイズ取得 */
	ffont_size=font_size/1.33; /* フォントサイズ補正 */
	font_height=cslfonthight(1.0); /* 文字表示エリア幅取得 */
	font_width=cslfontwidth(1.0); /* 文字表示エリア高さ取得 */
	xx1=xcord(x1+MIKA_width_x); /* 表示位置x座標を仮想座標から実座標に変換 */
	yy1=ycord(y1); /* 表示位置 y座標を仮想座標から実座標に変換 */
	g.font=font_size.toFixed()+'px monospace'; /* 文字フォント指定 */
	xx=Math.floor(xx1+ (ffont_size-font_height)/2); /* 表示位置の中央の実x座標を計算 */
	yy=Math.floor(yy1+ (font_width - font_size)/2); /* 表示位置の中央の実y座標を計算 */
	if(MIKA_mes_del_flag==1) /* 表示消去の場合は文字表示エリアを背景色で塗りつぶし */
	{
		measure=g.measureText(mes); /* 文字表示エリア取得 */
		textwidth=measure.width; /* 文字表示エリア横幅を取得 */
		h1=measure.actualBoundingBoxAscent; /* 基準線より上のドット数取得 */
		h2=measure.actualBoundingBoxDescent; /*基準線より下のドット数取得 */
		g.fillRect(yy,xx-h1-1,textwidth,h1+h2+2); /* 背景色で文字表示エリアを塗りつぶし */
	}
	else
	{
		g.fillText(mes,yy,xx); /* 文字表示 */
	}
}		
function cslputzscale(g,x,y,a,scale) /* 半角英数を全角文字に変換して指定の倍率で表示 */
{
		var aa;
		if('0'<=a&&a<='9') { /* 数字を半角から全角に変換 */
			aa=String.fromCharCode(a.charCodeAt(0)+0xfee0);
		}
		else if('A'<=a&&a<='Z')
		{ /* 英大文字を半角から全角に変換 */
			aa=String.fromCharCode(a.charCodeAt(0)+0xfee0);
		}
		else if('a'<=a&&a<='z') { /* 英小文字を半角から全角に変換 */
			aa=String.fromCharCode(a.charCodeAt(0)+0xfee0);
		}
		else if(a==',') /* カンマを半角から全角に変換 */
		{
			aa='，';
		}
		else if(a=='.') /* ピリオドを半角から全角に変換 */
		{
			aa='．';
		}
		else if(a==' ') /* スペースを半角から全角に変換 */
		{
			aa='　';
		}
		else if(a==';') /* セミコロンを半角から全角に変換 */
		{
			aa='；';
		}
		else {
			aa=a;
		}
		cslputscale(g,x,y,aa,scale); /* 文字列を指定で倍率で仮想座標で表示 */
}
function cslput(g,x,y,mes)/* 文字列を仮想座標で表示 */
{
	var i,j,length;
	length=mes.length; /* 文字列の長さを取得 */
	j=0;
	for(i=0;i<length;i++) 
	{
		cslputscale(g,x,y+j,mes[i],1.0); /* 指定位置に一文字表示 */
		j=j+8*charlength(mes[i]); /* 表示文字位置更新 半角文字は y座標を 1 加算 全角文字は 2加算 */
	}
}
function cslputu(g,x,y,mes,yy,color1) /* 文字列の下に下線を表示 */
// x 文字列表示左上仮想x座標
// y 文字列表示左上仮想y座標 
// mes アンダーラインを引く文字列
// yy 文字列下端から下線までのドット数間隔の補正値
// color1 表示色 
	{
		var char_length;
		var x1,x2,xx,y1,y2;
		var font_size,ffont_size;
		var font_hight;
		char_length=stringlength(mes); /* 文字列長取得 半角文字は長さ=1 全角文字は長さ=2で計算*/
		font_size=cslfontsize(1.0); /* 等倍のフォントサイズ取得 */
		ffont_size=font_size; /* フォントサイズ補正 */
		font_hight=cslfonthight(1.0); /* 表示エリア高さを取得 */
		x1=xcord(x+MIKA_width_x)+yy+(ffont_size-font_hight)/2+2; /* アンダーラインのx座標設定 */
		x2=xcord(1)-xcord(0); /* アンダーラインの太さを設定 */
		if(x2>0) x2--; /* 太さが一以上の時は太さを一減らす */
		y1=ycord(y); /* アンダーラインの開始y座標設定 */
		y2=ycord(y+char_length*8); /* アンダーラインの終了y座標設定 */
		cslcolor(g,color1); /* アンダーラインの色を設定 */
		if(color1==MIKA_bk_color) g.lineWidth=3; /* 線を消去の時は太さ3で描画 */
		else
		{
			g.lineWidth=2; /* 線を表示の場合は太さ2で描画 */
		}
		g.beginPath(); /* 直線描画開始 */
		for(xx=x1;xx<=x1+x2;xx++) /* 指定の太さのアンダーラインを描画 */
		{
			g.moveTo(y1,xx); /* 描画開始位置にペン移動 */
			g.lineTo(y2,xx); /* 描画終了位置まで直線を描画 */
		}
		g.stroke(); /* 直線描画実行 */
	}
function cslmencenter(g,x,mes) /* 中央にメッセージ文字列を表示 */
// x 文字列表示仮想座標
	{
		var y;
		var k;
		var kk;
		if(MIKA_max_y_flag==0) kk=80; /* 横幅半角80文字モード */
		else kk=64; /* 横幅半角64文字モード */
		k=stringlength(mes); /* 文字列長取得  半角文字は長さ=1 全角文字は長さ=2で計算*/
		y=((kk-k)*MIKA_width_y)/2; /* 表示開始位置計算 */
		cslput(g,x,y,mes); /* 文字列表示 */
}
function cslrectt(g,x1,y1,x2,y2,color1) /* 四角を表示 */
{
	cslrecttt(g,x1,y1,x2,y2,color1,0); /* 境界なしで四角を表示 */
}
function cslrecttt(g,x1,y1,x2,y2,color,b) /* 四角の内側を境界幅bで塗りつぶす */
{
	var xx1,xx2,yy1,yy2;
	var bx,by,bb;
	if(b!=0) /* 境界幅が0で無い場合 */
	{
		bx=xcord(b)-xcord(0); /* 縦方向の境界幅を仮想座標から実座標に変換 */
		by=ycord(b)-ycord(0); /* 横方向の境界幅を仮想座標から実座標に変換 */
		bb=Math.min(bx,by); /* 縦方向の境界幅と横方向の境界幅の小さい方の値を設定 */
		if(bb<=0) bb=1; /* 境界幅がゼロ以下の場合は境界幅を位置に設定 */
	}
	else bb=0;
	xx1=xcord(x1)+bb;	/* 左上 x 座標を 仮想座標から実座標に変換 */
	xx2=xcord(x2)-bb;	/* 右下 x 座標を 仮想座標から実座標に変換 */
	yy1=ycord(y1)+bb;	/* 左上 y 座標を 仮想座標から実座標に変換 */
	yy2=ycord(y2)-bb;	 /* 右下 y 座標を 仮想座標から実座標に変換 */
	g.fillStyle=color;  /* 表示色を設定 */
	if(xx1<=xx2&&yy1<=yy2)	g.fillRect(yy1,xx1,yy2-yy1,xx2-xx1);	/*四角を描画 */
}
function cslfonthight(scale) /* 指定倍率で全角文字の表示エリア高さを取得 */
{
	var font_hight;
	var font_size;
	font_size=MIKA_width_x*scale; /* 表示エリア高さを仮想座標で計算 */
	font_hight=xcord(font_size)-xcord(0);  /* 表示エリア高さを実座標に変換 */
	return font_hight;
}
function cslfontwidth(scale) /* 指定倍率で全角文字の表示エリア幅を取得 */
{
	var font_width;
	var font_size;
	font_size=(MIKA_width_y*2*scale); /* 表示エリア幅を仮想座標で計算 */
	font_width=ycord(font_size)-ycord(0); /* 表示エリア幅を実座標に変換 */
	return font_width;
}
function cslfontsize(scale) /* 指定倍率でフォントサイズを取得 */
	{
		var font_hight;
		var font_width;
		var font_size;
		font_hight=cslfonthight(scale); /* 指定倍率で表示エリア高さを取得 */
		font_width=cslfontwidth(scale); /* 指定倍率で表示エリア幅を取得 */
		font_size=Math.min(font_hight,font_width); /* 表示エリア高さと表示エリア幅の小さい方の値をフォントサイズに指定 */
		return font_size;
	}
function xcord(x1) /* 仮想x座標を 実x座標に変換 */
{
	var max_x_cord1;
	var x,xx;
	if(MIKA_max_x_flag==0) /* 縦25行モードの設定 */
	{
		max_x_cord1=25*16;
	}
	else /* 縦20行モードの設定 */
	{
		max_x_cord1=20*16;
	}
	x=MIKA_win_size_height;
	xx=Math.floor((x*x1)/max_x_cord1); /* 仮想座標を実座標に変換 */
	return(xx);
}
function ycord(y1) /* 仮想y座標を 実y座標に変換 */
{
    var max_y_cord1;
    var y, yy;
 	if(MIKA_max_y_flag==0) /* 一行横 80カラムモードの設定 */
	{
		max_y_cord1=80*8;
	}
	else /* 一行横 64カラムモードの設定 */
	{
		max_y_cord1=64*8;
	}
    y = MIKA_win_size_width;
    yy = Math.floor((y * y1) / max_y_cord1); /* 仮想座標を実座標に変換 */
    return(yy);
}
function disperrorcount(g,flag,i,j) /* エラー入力回数表示 */
// flag=0 表示 flag=1 数値のみ消去 flag=2 メッセージと共に数値を消去
// i 表示位置縦行番号
// j 表示位置横列番号
	{
//		type_mes=String.format("ミスタッチ%3d回",MIKA_type_err_count); /* エラーカウントメッセージ作成 */
		var type_mes;
		type_mes='ミスタッチ'+formatd(MIKA_type_err_count,5)+'回'; /* エラーカウントメッセージ作成 */
		if(flag==0)
		{
 			cslcolor(g,MIKA_red); /* フラグが=0の時は表示色を赤色に設定 */
		}
		else if(flag==1)
		{
			cslcolor(g,MIKA_bk_color); /* フラグが=1の時は表示を消去 */
		}
		else
		{
			cslcolor(g,MIKA_bk_color); /* フラグが=2の時はメッセージを含めて表示を消去 */
		}
		//		System.out.printf("i=%d j=%d",i,j);
		cslput(g,i*16,j*8,type_mes); /* 指定位置にエラーカウント表示 */
	}
function disperror3(g,flag) /* 英文テキスト練習エラー回数表示 */
// flag=0 表示 flag=1 数値のみ消去  flag=2 メッセージと共に数値を消去
	{
		disperrorcount(g,flag,3,57); /* 表示位置を指定してエラー回数表示 */
	}
function disptitle(g,mes,submes) /* 練習項目を画面上部に表示 */
// mes 練習種別メッセージ
// submes 練習項目メッセージ
	{
		var mes0;
		var a='%s';
		mes0=mes.replace(a,submes); /* 記号'%s'をsubmesで置換 */
		cslcolor(g,MIKA_magenta); /* 表示色をマゼンタに設定 */
		cslmencenter(g,1,mes0); /* 画面上部中央にメッセージを表示 */
//		System.out.printf(mes0);
	}
function displtitle1(g) /* テキスト練習画面 上部表示 */
	{
		var a;			
		if(MIKA_p_count[MIKA_type_kind_no]!=0)  /* 練習回数がゼロでない場合 */
		{
			dispkaisu3(g,0); /* 練習回数を表示 */
		}
		if(MIKA_type_speed_record[MIKA_type_kind_no]!=0.0) /* 最高入力速度がゼロでない場合 */
		{
			cslcolor(g,MIKA_green);
			a="最高入力速度"+formatf1(MIKA_type_speed_record[MIKA_type_kind_no],6)+"文字("+formatf1(MIKA_type_word_speed_record[MIKA_type_kind_no],5)+"ワード)/分";
			cslput(g,2*16,17*8,a); /* 最高速度 ワード表示 */
			a="達成日   "+MIKA_type_date_record[MIKA_type_kind_no];
			cslput(g,2*16,57*8,a); /* 達成日表示 */
		}
	}
function displtitle2(g) /* テキスト練習画面 メッセージと区切り線を表示 */
	{
		var	x1,x2,y1,y2,xx;
		var i;
		cslcolor(g,MIKA_cyan); /* 表示色をシアンに設定 */
 		cslput(g,4*16,1,"修正はBSを押して下さい、行末ではスペースかEnterを押して下さい、ESCで中断します"); 
		cslcolor(g,MIKA_key_black); /* 表示色を黒色に設定 */
		x1=xcord(MIKA_kugiri_text_line); /* 区切り線 x 座標 開始位置取得 */
		x2=xcord(MIKA_kugiri_text_line+1); /* 区切り線 x 座標 終了位置取得 */
		xx=x2-x1;
		if(xx>1) xx--; /* 太さが一以上の時は太さを一減らす */
		y1=ycord(0); /* 区切り線 y 座標 開始位置取得 */
		y2=ycord(639); /* 区切り線 y 座標 終了位置取得 */
		g.lineWidth=2; /* 線を表示の場合は太さ2で描画 */
		g.beginPath(); /* 直線描画開始 */	
		for(i=0;i<=xx;i++)
		{
			g.moveTo(y1,x1+i); /* 描画開始位置にペン移動 */
			g.lineTo(y2,x1+i); /* 描画終了位置まで直線を描画 */
		}
		g.stroke(); /* 直線描画実行 */
	}
function dispkaisu3(g,flag) /* 英文テキス練習 練習回数表示 */
// flag=0 表示 flag=1 消去 
	{
		var type_mes;
		var count;
		if(MIKA_p_count==null) return; /* 練習回数配列アドレスが空の時はリターン */
		count=MIKA_p_count[MIKA_type_kind_no]; /* 練習項目に対応する練習回数取り出し */
//		System.out.printf("count=%d  MIKA_type_kind_no=%d\n",count,MIKA_type_kind_no);
		if(count==0) return; /* 練習回数がゼロの時はリターン */
		if(flag==0) cslcolor(g,MIKA_green); /* フラグが=0の時は表示色を緑色に設定 */
		else cslcolor(g,MIKA_bk_color); /* フラグが=1の時は表示を消去 */
		type_mes="練習回数"+formatd(count,7)+"回"; /* 練習回数メッセージ作成 */
		cslput(g,16,57*8,type_mes); /* 練習回数メッセージ表示 */
	}
function timemessage(flag,t1,t2) /* 経過時間の表示メッセージを作成 */
	{
		var a;
		if(flag==0) /* 打ち切りでない場合 */
		{
			if(t1<=0.0) /* 一分以下の時は 秒のみ表示 */
			{
				a="経過時間"+formatd(t2,3)+"秒"; /* 秒のみの経過時間表示メッセージ作成 */
			}
			else
			{
				a="経過時間"+formatd(t1,3)+"分"+formatd(t2,2)+"秒"; /* 分と秒の経過時間表示メッセージ作成 */
			}
		}
		else /* 打ち切りの時は小数点以下二桁まで表示 */
		{
			if(t1<=0.0) /* 一分以下の時は 秒のみ表示 */
			{
				a="経過時間"+formatf2(t2,5)+"秒"; /*  小数点二桁まで秒のみの経過時間表示メッセージ作成 */
			}
			else
			{
				a="経過時間"+formatd(t1,3)+"分"+formatf2(t2,5)+"秒"; /* 小数点二桁まで分と秒の経過時間表示メッセージ作成 */
			}
		}
		return a;
	}
function disptime2(g,flag) /* 経過時間分秒を表示 */
	// flag=0 表示 flag=1 消去 
	{
		var	type_mes;
		var t1;
		var t2;
		var	offset;
		t1=roundtime(MIKA_type_speed_time/60.0); /* 経過分を算出 */
		t2=MIKA_type_speed_time-t1*60; /* 経過秒を算出 */
		if(flag==0) /* 経過時間 表示の場合 */
		{
 			cslcolor(g,MIKA_blue);  /* フラグが=0の時は表示色を青に設定 */
			type_mes=timemessage(MIKA_utikiri_flag,t1,t2); /* 練習時間分秒のメッセージを作成 */
			cslput(g,3*16,1,type_mes); /* 経過時間秒のメッセージを表示 */
		}
		else /* 表示消去の場合 */
		{
			cslcolor(g,MIKA_bk_color); /* フラグが=1の時は表示を消去 */
			type_mes=timemessage(MIKA_utikiri_flag2,t1,t2); /* 練習時間分秒のメッセージを作成 */
			cslput(g,3*16,1,type_mes); /* 経過時間秒のメッセージを表示 */
		}
	}
function displinetrain(g,mestb) /* 練習実行画面を表示 */
{
		var i,j;
		cslclr(g); /* 画面クリア */
		disptitle(g,mestb,MIKA_type_kind_mes); /* 練習テキスト表題を表示 */
		displtitle1(g); /* テキスト練習画面 上部表示 */
		displtitle2(g); /* テキスト練習画面 メッセージと区切り線を表示 */
		cslcolor(g,MIKA_key_black); /* 表示色を黒色に設定 */
		for(i=0;i<8;i++)
		{
			j=i+MIKA_scroll_point; /* 練習テキスト表示開始行位置取得 */
			if(j<MIKA_max_c_line) /* 最大行まで練習テキストを表示 */
			{
				cslput(g,MIKA_start_text_line+MIKA_double_text_hight*i,0,MIKA_c_line[j]); /*練習テキストを一行表示 */
			}
			else
			{
				break;
			}
		}
		dispcur(g,scroll_cord_x(),scroll_cord_y(),1,MIKA_color_cursor); /* カーソル表示 */
}
function ppseiseki(g,i,j,menu_mes,r_mojisu,r_speed,w_speed,r_date,r_time,t_kaisu) /* 成績表示 初級 中級 上級 */
/* i 表示位置 j 表示個数 menu_mes 練習項目 r_mojisu 練習テキスト文字数 r_speed 最高速度 文字数／分 w_speed 最高速度 ワード／分 r_date 達成日 r_time 累積練習時間  t_kaisu 練習回数 */
	{
		var ii;
		var a,b;
		for(ii=0;ii<j;ii++)
		{
			a=formatd(ii+1,1)+":"+menu_mes[ii];
			cslput(g,(i+ii)*16,1,a); /* 練習テキスト表題を表示 */
			if(r_mojisu[ii]!=0) /* 練習テキスト文字数が 0 でない場合 */
			{
				a=formatd(r_mojisu[ii],6); /* 練習テキスト文字数を文字列に変換 */
				cslput(g,(i+ii)*16,32*8,a); /* 練習テキスト文字数を表示 */
				
			}
			if(r_speed[ii]!=0.0) /*最高入力速度が 0.0 でない場合 */
			{
				a=formatf1(r_speed[ii],6)+'('+formatf1(w_speed[ii],5)+')'; /* 最高入力速度を文字列に変換 */
				cslput(g,(i+ii)*16,38*8,a); /* 最高入力速度を表示 */
				cslput(g,(i+ii)*16,52*8,r_date[ii]); /* 達成日を表示 */
			}
			b=tconv(r_time[ii]); /* 累積練習時間を文字列に変換 */
			cslput(g,(i+ii)*16,59*8,b); /* 累積練習時間を表示 */
			b=formatd(t_kaisu[ii],4); /* 練習回数を文字列に変換 */
			cslput(g,(i+ii)*16,76*8,b); /* 練習回数を表示 */
		}
}
function dispseiseki(g) /* 成績表示 */
	{
		var i;
		var time_i;
		var a,aa,b;
		cslclr(g); /* 画面クリア */
		a=tconv(MIKA_rt_t); /* 前回までの合計練習時間を文字列に変換 */
		aa="前回までの練習時間　"+a; /* 前回までの合計練習時間のメッセージ作成 */
		cslcolor(g,MIKA_green); /* 表示色を緑色に設定 */
		cslput(g,1,1,aa); /* 前回までの合計練習時間を表示 */
		cslcolor(g,MIKA_blue); /* 表示色を青色に設定 */
		cslput(g,1,43*8,MIKA_return_mes); /* エスケープキーを押すとメニューに戻りますのメッセージを表示 */
		time_i=seisekiruiseki()-MIKA_rt_t; /* 今回の練習時間を秒で算出 */
		a=tconv(time_i); /* 今回練習時間を文字列に変換 */
		aa="今回の練習時間　　　"+a; /* 今回練習時間のメッセージを作成 */
		cslcolor(g,MIKA_green); /* 表示色を緑色に設定 */
		cslput(g,16,1,aa); /* 今回練習時間を表示 */
		cslcolor(g,MIKA_blue); /* 表示色を青色に設定 */
		cslput(g,3*16,1,MIKA_mest2); /* 成績メッセージ表示 */
		cslput(g,4*16,1,MIKA_mest3); /* 成績メッセージ下一行を表示 */
		cslcolor(g,MIKA_orange); /* 表示色をオレンジに設定 */
		ppseiseki(g,6,6,MIKA_ti_text,MIKA_t_mojisu,MIKA_t_speed,MIKA_tw_speed,MIKA_t_date,MIKA_t_time,MIKA_t_kaisu); /* 成績を表示 */
	}
function dispmen(g) /* メニュー及び練習画面表示 */
{
	if (MIKA_exec_func_no==1) menexe(g,MIKA_menu_mes_s,MIKA_menu_cord_s,MIKA_menu_s_function,MIKA_menu_s_sel_flag,MIKA_mes0); /* 初期メニュー表示 */
	else if (MIKA_exec_func_no==19) dispseiseki(g); /* 成績表示 */
	else if(MIKA_exec_func_no>1100&&MIKA_exec_func_no<1200) displinetrain(g,MIKA_mesta); /* 英文テキスト練習の各項目の実行画面表示 */
}
function menexe(g,menu_mes,menu_cord,menu_function,sel_flag,menut)
	{
		var i,j;
		var x;
		var y;
		mesi5="番号キーを押して下さい";
		MIKA_max_x_flag=0; /* 縦 25行モードに設定 */
		MIKA_max_y_flag=0; /* 横 80カラムモードに設定 */
		cslclr(g); /* 画面クリア */
		cslcolor(g,MIKA_magenta); /* 表示色をマゼンタに設定 */
		cslmencenter(g,1,menut); /* メニュータイトルを上端の中央に表示 */
		MIKA_max_x_flag=1; /* 縦 20行モードに設定 */
		MIKA_max_y_flag=1; /* 横 64カラムモードに設定 */
		cslcolor(g,MIKA_cyan);
		cslput(g,18*16,29*8,mesi5); /* 番号キーを押して下さいのメッセージを表示 */
		j=menu_mes.length;
		for(i=0;i<j;i++)
		{
			x=menu_cord[i][0]; /* メニュー表示位置 x座標取得 */
			y=menu_cord[i][1]; /* メニュー表示位置 y座標取得 */
			if(sel_flag[i]==1)	cslcolor(g,MIKA_green); /*前回選択メニュー項目は緑色で表示 */
			else 	cslcolor(g,MIKA_blue); /* その他のメニューは青色で表示 */
			cslput(g,x,y,menu_mes[i]); /* メニュー項目表示 */
			if(sel_flag[i]==1) cslputu(g,x,y,menu_mes[i],1,MIKA_green); /* 前回選択メニュー項目に下線を表示 */
			cslputzscale(g,x,y-4*MIKA_width_y,String.fromCharCode('1'.charCodeAt()+i),1.0); /* メニュー番号を表示 */
		}
		MIKA_menu_function_table=menu_function; /* 機能番号テーブル設定 */
		MIKA_sel_flag=sel_flag; /* 前回選択メニュー項目選択フラグアドレス設定 */
		MIKA_max_x_flag=0; /* 縦 25行モードに戻す */
		MIKA_max_y_flag=0; /* 横 80カラムモードに戻す */
}
function mencom(menu_function_table,sel_flag,nChar) /* 選択されたメニューの項目に対応する機能番号を取得 */
	{
		var func_no=0;
		var i,ii,iii;
		var sel_flag1=0;
		if(menu_function_table==0) return(0);
		ii=menu_function_table.length;
		if(nChar==0x1b){ /* 入力文字がエスケープの場合 */
			for(i=0;i<ii;i++) /* メニューに戻りますのメニュー項目をサーチ */
			{
				if(menu_function_table[i]>9000&&menu_function_table[i]<9999) /* メニューに戻りますのメニュー項目があった場合 */  
				{
					func_no=menu_function_table[i];
				}
			}
			return(func_no);
		}
		else if(nChar<='0'||nChar>'9') return(0); /* 入力文字が1～9の数字以外は処理をしないでリターン */
		else
		{
			iii=nChar.charCodeAt()-0x31; /* 文字を数字に変換 */
			if(iii<ii) /* 入力された数字に対応するメニューがある場合 */
			{
				func_no=menu_function_table[iii]; /* 対応する機能番号を取り出す */
				for(i=0;i<ii;i++)
				{
						if(sel_flag[i]!=0) sel_flag1=i+1; /* 前回選択メニュー項目番号をサーチ */
				}
				if(0<func_no&&func_no<9000) /* 今回選択メニューがメニューに戻るで無い場合 */
				{
					if(sel_flag1!=0) sel_flag[sel_flag1-1]=0; /*前回選択メニュー番号をクリア */
					sel_flag[iii]=1; /* 今回の選択メニュー番号を前回選択メニュー番号に設定 */
				}
				return(func_no);
			}
			else
			return(0);
		}	
	}	
function exec_func(g,nChar) /* 一文字入力に対応した処理を行う */
	{
		var func_no;
		func_no=mencom(MIKA_menu_function_table,MIKA_sel_flag,nChar); /* 選択されたメニューの項目に対応する機能番号を取得 */
		if(func_no!=0) /* メニュー表示中に数字キーが押されて対応する機能番号がゼロでない場合 */
		{
			MIKA_menu_function_table=0;
			MIKA_exec_func_no=func_no;
//			if(MIKA_exec_func_no==9999) procexit(); /* 機能番号が 9999の時は終了 */
			if(MIKA_exec_func_no==20)
			{
					if(window.confirm("成績を消去してもいいいですか")) /* 成績を消去してもいいですかのダイアログを表示 */
					{
						seisekiclear(); /* 成績をクリア */
					}
					MIKA_exec_func_no=1; /* 初期メニューのメニュー番号設定 */
			}
			else
			{
				if (MIKA_exec_func_no>9000) MIKA_exec_func_no=MIKA_exec_func_no-9000; /* 機能番号がメニューに戻るの時は、メニュー番号を取得 */
			
				else
				if(MIKA_exec_func_no>1100&&MIKA_exec_func_no<1200) /* 機能番号が英文テキスト練習の場合は各練習の項目ごとに前処理を行う */
				{
					preplinetrain(MIKA_exec_func_no); /* 英文テキスト練習の各項目ごとの前処理 */
				}
			}
			dispmen(g); /* メニュー、練習画面表示 */
			return(1);
		}
		else
		{
			if(nChar==0x1b&&MIKA_exec_func_no==19) /* 成績表示中にエスケープキーが押された場合 */
			{
				MIKA_exec_func_no=1; /* 初期メニューのメニュー番号設定 */
				dispmen(g); /* メニュー表示 */
				return(1);
			}
			else if(MIKA_exec_func_no>1100&&MIKA_exec_func_no<1200) /*  英文テキスト練習の実行中の場合  */
			{
				proclinetrain(g,nChar); /* 英文テキスト練習の文字入力処理 */
				return(1);
			}
		}
		return (0);
	}
function ftypespeed(count,start_time,end_time) /* 一分間あたりのタイプ速度を計算 */
// count 文字数
// start_time 開始時間 ミリ秒
// end_time 終了時間 ミリ秒
	{
		var speed_rate;
		if(end_time==start_time) speed_rate=0.0; /* 開始時間と終了時間が一致する場合はタイプ速度をゼロに指定 */
		else
		{
			speed_rate=1000.0*60.0*count/(end_time-start_time); /* 一分間あたりのタイプ速度を計算 */
		}
		return speed_rate;
	}
function dispspeedrate3(g,flag) /* 英文テキスト練習 入力速度表示 */
// flag=0 表示 flag=1 消去
	{
		var a,b;
		var offset_a,offset_b;
		if(flag==0)
		{
			cslcolor(g,MIKA_blue); /* flagが=ゼロの時は青色で表示 */
		}
		else
		{
			cslcolor(g,MIKA_bk_color); /* flagが=1の場合は表示消去 */
		}
		b="入力速度"+formatf1(MIKA_type_speed,6)+"文字("+formatf1(MIKA_type_word_speed,5)+"ワード)/分"; /* 入力速度を文字列に変換 */
		cslput(g,3*16,21*8,b); /* 入力速度を表示 */
	}
function procdispspeed3(g)  /* 英文テキスト練習 入力速度を計算して再表示 */
	{
			if(MIKA_type_speed_time<60.0&&MIKA_ttype_speed_time>=60.0) disptime2(g,2); /* 前回練習経過時間表示を消去 */
			else disptime2(g,1);
			dispspeedrate3(g,1); /* 前回 入力速度表示を消去 */
			MIKA_type_speed_time=MIKA_ttype_speed_time; /* 練習経過時間を更新 */
 			MIKA_type_speed=ftypespeed(MIKA_type_count,MIKA_type_start_time,MIKA_type_end_time); /* 入力速度  文字数／分を取得 */
	 		MIKA_type_word_speed=MIKA_type_speed/5.0; /* 入力速度 ワード／分を取得 */
			disptime2(g,0); /* 今回練習経過時間を表示 */
			dispspeedrate3(g,0); /* 今回 入力速度を表示 */
	}
function preplinetrain(func_no) /* 練習の前処理 */
{
			if(MIKA_exec_func_no>1100&&MIKA_exec_func_no<1200) /* 英文テキスト練習の前処理 */
			{
					MIKA_type_kind_no=func_no-1101; /* 練習項目番号を取得 */
					MIKA_cookie_kind='T'; /* 練習成績クッキー保存用タグ種別 */
					MIKA_type_speed_record=MIKA_t_speed; /* 最高速度記録配列 文字数／分アドレスに 英文テキスト練習 最高速度記録 文字数／分 を設定 */
					MIKA_type_word_speed_record=MIKA_tw_speed; /* 最高速度記録配列 ワード／分アドレスに 英文テキスト練習 最高速度記録 ワード／分 を設定 */
					MIKA_type_date_record=MIKA_t_date; /* 最高速度達成日配列アドレスに 英文テキスト練習 最高速度達成日付 を設定 */
					MIKA_type_time_record=MIKA_t_time; /* 累積練習時間配列アドレスに 英文テキスト練習 累積練習時間 を設定 */
					MIKA_p_count=MIKA_t_kaisu; /* 練習回数配列アドレスに英文テキスト練習 練習回数 を設定 */
					MIKA_type_kind_mes=MIKA_ti_text[MIKA_type_kind_no]; /* 練習テキスト表題を設定 */ 
					prepflagsline(); /* 英文テキスト練習開始時のフラグクリア */
					MIKA_c_line=MIKA_c_line_table[MIKA_type_kind_no]; /* 練習テキストを設定 */
					MIKA_max_c_line=MIKA_c_line.length; /* 練習テキスト行数を設定 */
			}
}
function prepflagsline() /* 英文テキスト練習開始時のフラグクリア処理 */
	{
		MIKA_practice_end_flag=0; /* 練習実行中フラグ クリア */
		MIKA_time_start_flag=0; /* 時間計測開始フラグ クリア */
		MIKA_current_point_x=1; /* 練習テキストの入力行の位置を1に設定 */
		MIKA_scroll_point=1; /* 画面スクロール表示の開始行の位置を1に設定 */
		MIKA_text_point_x=0; /* 文字入力カーソル縦行位置クリア */
		MIKA_text_point_y=0; /* 文字入力カーソル横文字位置クリア */
		MIKA_err_count=0; /* エラー文字表示文字数クリア */
		MIKA_type_count=0; /* 入力文字数カウンター クリア */
		MIKA_type_speed=0.0; /* 練習テキストの入力速度 文字数／分クリア */
		MIKA_type_word_speed=0.0; /* 練習テキストの入力速度 ワード／分クリア */
		MIKA_type_speed_time=0.0; /* 前回 練習経過時間 クリア */
		MIKA_ttype_speed_time=0.0; /* 今回 練習経過時間 クリア */
		MIKA_type_err_count=0; /* エラー入力文字数カウンター クリア */
		MIKA_utikiri_flag=0; /* 速度表示時の練習テキスト打ち切りフラグ クリア */
		MIKA_utikiri_flag2=0; /* 前回速度表示時の練習テキスト打ち切りフラグ クリア */
		MIKA_type_syuryou_flag=0; /* 練習終了時の記録更新フラグ クリア */
		MIKA_disp_cursor_flag=1; /* カーソル表示フラグを1に設定 */
		MIKA_sec_count=0; /* 秒カウンター クリア */
	}
function dispretrymessage(g,flag) /* リトライメッセージ表示 flag=0 表示を行う flag=1 表示を消去 */
{
	if(flag==0) cslcolor(g,MIKA_cyan); /* 表示色をシアンに設定 */
	else cslcolor(g,MIKA_bk_color); /* 表示色を背景色に設定 */
	cslput(g,22*16,10*8,MIKA_mesi1); /* 「もう一度練習するときはリターンキーまたは、Enterキーを押してください」のメッセージを表示 */
	cslput(g,23*16,10*8,MIKA_mesi2); /* 「メニューに戻るときはESCキーを押してください」のメッセージを表示 */
}
function funcbackmenu(func_no) /* メニューの階層を一段上に戻る */
	{
		ffun_no=1; /* 初期メニューに戻る */
		return ffun_no;
	}
function proclinetrain(g,nChar) /* 英文テキスト練習の文字入力処理 */
	{
//			System.out.printf("char %x pressed\n",(int) nChar);
		if(nChar==0x1b){ /* エスケープキー入力の場合 */
			if(MIKA_practice_end_flag==0) /* 入力練習実行中の場合 */
			{
				MIKA_practice_end_flag=1; /* 練習実行中フラグを終了にセット */
				if(MIKA_time_start_flag!=0) /* 最初の正解を入力済の場合 */
				{
					clearInterval(MIKA_Procttimer);	 /* 練習時間表示のタイマーをキャンセル */
					MIKA_type_end_time=getmillisecond(); /* 練習終了時間をミリ秒で取得 */
					MIKA_type_speed_time=roundtime((MIKA_type_end_time-MIKA_type_start_time)/1000.0); /* 練習経過時間 秒を計算 */
					MIKA_type_time_record[MIKA_type_kind_no]=MIKA_type_time_record[MIKA_type_kind_no]+roundtime(MIKA_type_speed_time); /* 累積練習時間の記録を加算 */
					writecookie(); /* クッキーに累積練習時間を保存 */
				}
				cslrectt (g,21*16+8,0,24*16+8,80*8,MIKA_bk_color); /* リトライメッセージ背景クリア */
				dispretrymessage(g,0); /* リトライメッセージ表示 */
			}
			else if(MIKA_practice_end_flag==1) /* 練習終了の場合 */
			{
				if(MIKA_type_syuryou_flag==1||MIKA_type_syuryou_flag==2)	 /* 練習記録を更新した場合 */
				{
					MIKA_type_speed_record[MIKA_type_kind_no]=MIKA_type_speed; /* 練習記録 最高入力速度 文字数／分 を更新 */
					MIKA_type_word_speed_record[MIKA_type_kind_no]=MIKA_type_word_speed; /* 練習記録 最高入力速度 ワード／分 を更新 */
					MIKA_type_date_record[MIKA_type_kind_no]=MIKA_type_date; /* 練習記録 達成日を更新 */
					MIKA_type_syuryou_flag=0; /* 練習終了時の記録更新フラグ クリア */
				}
				MIKA_exec_func_no=funcbackmenu(MIKA_exec_func_no); /* メニューを一階層戻る */
				dispmen(g); /* メニュー表示 */
			}
		}
		else if((nChar==0x0d||nChar==0x0a)&&MIKA_practice_end_flag==1)	 /* 練習の終了時に改行が入力された場合 */
		{
			MIKA_practice_end_flag=0; /* 練習実行中フラグをクリア */
			if(MIKA_type_syuryou_flag==1||MIKA_type_syuryou_flag==2)	 /* 練習記録を更新した場合 */
			{
				MIKA_type_speed_record[MIKA_type_kind_no]=MIKA_type_speed; /* 練習記録 最高入力速度 文字数／分 を更新 */
				MIKA_type_word_speed_record[MIKA_type_kind_no]=MIKA_type_word_speed; /* 練習記録 最高入力速度ワード／分を更新 */
				MIKA_type_date_record[MIKA_type_kind_no]=MIKA_type_date; /* 練習記録 達成日を更新 */
			}
			MIKA_type_syuryou_flag=0; /* 練習終了時の記録更新フラグ クリア */
			prepflagsline(); /* 英文テキスト練習開始時のフラグクリア */
			dispmen(g); /* 英文テキスト練習画面 再表示 */
		}
		else if(MIKA_practice_end_flag==0) /* 練習実行中の場合 */
		{
//			System.out.printf("TYPE char %1c %1c\n",MIKA_key_char,nChar);a.charAt(i)
			if(MIKA_err_count>0&&nChar==0x08) /* エラー文字表示中にバックスペースにより訂正する場合 */
			{
				dispcur(g,scroll_cord_x(),scroll_cord_y(),1,MIKA_bk_color); /* 現在位置カーソル消去 */
				MIKA_err_count--; /* エラー文字表示文字数 デクリメント */
				dispbkcharline(g,scroll_cord_x(),scroll_cord_y(),MIKA_bk_color); /* エラー文字の一番右の端の文字の背景をクリア */
				cslcolor(g,MIKA_bk_color); /* 表示色に背景色を設定 */
				cslput(g,scroll_cord_x(),scroll_cord_y(),MIKA_err_c_table[MIKA_err_count]); /* エラー文字の一番右端の文字をクリア */
				dispcur(g,scroll_cord_x(),scroll_cord_y(),1,MIKA_color_cursor); /* カーソルを一文字左に戻して表示 */
			}
			else if(MIKA_text_point_y>=MIKA_c_line[MIKA_current_point_x].length) /* 行末に文字が入力された場合 */
			{
				if((nChar==' '||nChar==0x0a||nChar==0x0d)&&MIKA_err_count==0) /* 入力された文字がスペースか改行の場合 */
				{
					dispcur(g,scroll_cord_x(),scroll_cord_y(),1,MIKA_bk_color); /* 現在位置カーソル消去 */
					if(MIKA_text_point_y>0)
					{
						cslcolor(g,MIKA_key_blue); /* 表示色を青色に設定 */
						cslput(g,scroll_cord_x(),scroll_cord_y()-8,MIKA_c_line[MIKA_current_point_x].charAt(MIKA_text_point_y-1)); /* 正解入力文字の一つ手前の文字を再表示 */
					}
					cslputu(g,scroll_cord_x(),scroll_cord_y(),"a",1,MIKA_color_text_under_line); /* 行末にアンンダーラインを表示 */
					MIKA_current_point_x++; /* 練習テキストの入力行の位置をインクリメント */
					if(MIKA_current_point_x>=MIKA_max_c_line) /* すべての練習テキストを入力し終わった場合 */
					{
							MIKA_practice_end_flag=1; /* 練習実行中フラグを終了にセット */
							clearInterval(MIKA_Procttimer);	 /* 制限時間60秒のタイマーをキャンセル */
							MIKA_disp_cursor_flag=0; /* カーソル表示フラグをクリア */
							MIKA_text_point_x++; /* 文字入力カーソル縦位置インクリメント */
							MIKA_text_point_y=0; /* 文字入力カーソル横位置をゼロに設定 */
							MIKA_utikiri_flag=1; /* 練習打ち切りフラグをセット */
							MIKA_utikiri_flag2=0; /* 前回練習速度消去用にフラグをクリア */
							MIKA_type_end_time=getmillisecond(); /* 現在時刻をミリ秒で取得 */
							MIKA_ttype_speed_time=(MIKA_type_end_time-MIKA_type_start_time)/1000.0; /* 経過秒を実数で計算 */						procdispspeed3(g); /* 入力速度を表示 */
							MIKA_type_time_record[MIKA_type_kind_no]=MIKA_type_time_record[MIKA_type_kind_no]+roundtime(MIKA_ttype_speed_time); /* 累積練習時間の記録を加算 */
							dispkaisu3(g,1); /* 前回練習回数表示クリア */
							MIKA_p_count[MIKA_type_kind_no]++; /* 練習回数インクリメント */
							dispkaisu3(g,0); /* 今回練習回数表示 */
							prockiroku(g); /* 記録を更新時の処理 */
							cslrectt (g,21*16+8,0,24*16+8,80*8,MIKA_bk_color); /* リトライメッセージ背景クリア */
							dispretrymessage(g,0); /* リトライメッセージ表示 */
					}
					else
					{
						if(MIKA_text_point_x==5) /* 五行目の入力で改行したときは練習テキストを二行分上にスクロールする */
						{
							cslscroll(g,MIKA_start_text_line,MIKA_double_text_hight,MIKA_rensyu_text_hight); /* 画面を二行分上方にコピー */
							if(MIKA_current_point_x+2<MIKA_max_c_line) /* 最下行に追加の練習テキスト表示がある場合 */
							{
								cslcolor(g,MIKA_key_black); /* 表示色を黒色に設定 */
								cslput(g,MIKA_start_text_line+MIKA_double_text_hight*7,0,MIKA_c_line[MIKA_current_point_x+2]); /* 最下行に練習テキスト表示 */
							}
							MIKA_scroll_point++; /* 画面スクロール表示の開始行位置をインクリメント */
						}
						else /* 行末の改行でスクロールしない場合 */
						{					
							MIKA_text_point_x++; /* 文字入力カーソル縦位置インクリメント */
						}
						MIKA_text_point_y=0; /* 文字入力カーソル横位置をゼロに設定 */
						dispcur(g,scroll_cord_x(),scroll_cord_y(),1,MIKA_color_cursor); /* 文字入力カーソルを表示 */
					}
				}
				else /* 行末の入力文字がエラーの場合 */
				{
					procerrchar(g,nChar); /* エラー入力文字の処理 */
				}
			}
			else
			{	
				MIKA_key_char=MIKA_c_line[MIKA_current_point_x].charAt(MIKA_text_point_y); /* 練習文字を取り出し */
				if	(MIKA_err_count==0&&MIKA_key_char==nChar) /* エラー文字表示がなくて入力が正解の場合  */
				{
				/* 正解の場合 */
					if(MIKA_time_start_flag==0) /* 最初の正解文字入力の場合 */
					{
						MIKA_type_start_time=getmillisecond();  /* 練習開始時間をミリ秒で取得取得 */
						MIKA_time_start_flag=1; /* 練習時間計測フラグセット */
						MIKA_Procttimer = setInterval(Procttimer,MIKA_text_time_interval,g); /* タイマーを一秒間隔でセット */
					}
					dispcur(g,scroll_cord_x(),scroll_cord_y(),1,MIKA_bk_color); /* 現在位置のカーソルを消去 */
					cslcolor(g,MIKA_color_text_under_line); /* 表示色を青色に設定 */
					if(MIKA_text_point_y>0)
					{
						cslput(g,scroll_cord_x(),scroll_cord_y()-8,MIKA_c_line[MIKA_current_point_x].charAt(MIKA_text_point_y-1)); /* 正解入力文字の一つ手前の文字を再表示 */
					}
					cslput(g,scroll_cord_x(),scroll_cord_y(),nChar); /* 正解入力文字を表示 */
					cslputu(g,scroll_cord_x(),scroll_cord_y(),"a",1,MIKA_color_text_under_line); /* 正解文字入力にアンダーラインを描画 */
					MIKA_type_count++; /* 正解数を加算 */
					MIKA_text_point_y++; /* 文字入力カーソル横位置をインクリメント */
					dispcur(g,scroll_cord_x(),scroll_cord_y(),1,MIKA_color_cursor); /* カーソルを新位置に表示 */
				}
				else /* 入力文字がエラーの場合 */
				{
						procerrchar(g,nChar); /* エラー入力文字の処理 */
				}
			}
		}
	}
function scroll_cord_x() /* カーソル位置 縦 x 座標算出 */
	{	
		return(MIKA_double_text_hight*MIKA_text_point_x+MIKA_start_text_line+MIKA_rensyu_text_hight);
	}
function scroll_cord_y() /* カーソル位置 横 y 座標算出 */
	{
		return((MIKA_text_point_y+MIKA_err_count)*8);
	}
function procerrchar(g,nChar) /* エラー入力文字処理 */
	{
		if(' '<=nChar&&nChar<='z')/* エラー入力文字が表示可能文字の場合 */
		{
			disperror3(g,1); /* 前回エラー入力文数表示を消去 */
			MIKA_type_err_count++; /* エラー入力文字数カウンターをインクリメント */
			disperror3(g,0); /* 今回エラー入力文字数を表示 */		
			if(MIKA_text_point_y+MIKA_err_count<79) /* エラー文字入力位置が 行末でない場合 */
			{
				MIKA_err_c_table[MIKA_err_count]=nChar; /* エラー文字保存エリアにエラー文字を保存 */
				dispcur(g,scroll_cord_x(),scroll_cord_y(),1,MIKA_bk_color); /* 現在カーソルを消去 */
				dispbkcharline(g,scroll_cord_x(),scroll_cord_y(),MIKA_color_text_err); /* エラー文字表示位置の背景を赤色表示 */
				cslcolor(g,MIKA_key_black); /* 表示色を黒色に指定 */
				if(MIKA_err_count>0)
				{
					cslput(g,scroll_cord_x(),scroll_cord_y()-8,MIKA_err_c_table[MIKA_err_count-1]); /* 一つ手前のエラー文字を黒色で再表示 */
				}
				cslput(g,scroll_cord_x(),scroll_cord_y(),nChar); /* エラー文字を黒色で表示 */
				MIKA_err_count++; /* エラー文字表示文字数をインクリメント */
				if(MIKA_text_point_y+MIKA_err_count<79) /* 次回表示カーソル位置が行末でない場合 */
				{
					dispcur(g,scroll_cord_x(),scroll_cord_y(),1,MIKA_color_cursor); /* カーソルを一つ進めて表示 */
				}
				else
				{
					dispcur(g,scroll_cord_x(),scroll_cord_y()-8,1,MIKA_color_cursor); /* カーソルを進めずに同じ位置に表示 */
				}
			}
			else /* エラー文字入力位置が行末の場合 */
			{
				cslcolor(g,MIKA_bk_color); /* 表示色に背景色を設定 */
				cslput(g,scroll_cord_x(),scroll_cord_y()-8,MIKA_err_c_table[MIKA_err_count-1]); /* 行末のエラー文字表示をクリア */
				MIKA_err_c_table[MIKA_err_count-1]=nChar; /* 行末の位置にエラー文字を保存 */
				dispcur(g,scroll_cord_x(),scroll_cord_y()-8,1,MIKA_bk_color); /* 行末のカーソルを消去 */
				cslcolor(g,MIKA_bk_color); /* 表示色に背景色を設定 */
				dispbkcharline(g,scroll_cord_x(),scroll_cord_y()-8,MIKA_color_text_err); /* エラー文字表示位置の背景を赤色で表示 */
				cslcolor(g,MIKA_key_black); /* 表示色を黒色に指定 */
				cslput(g,scroll_cord_x(),scroll_cord_y()-8,nChar); /* エラー文字を黒色で表示 */
				dispcur(g,scroll_cord_x(),scroll_cord_y()-8,1,MIKA_color_cursor); /* カーソルを進めずに同じ位置に表示 */
			}
		}
	}
function dispbkcharline(g,x,y,color) /* 入力文字の背景を指定色で塗りつぶす */
	{
		var x1,x2,y1,y2;
		cslcolor(g,color); /* 指定色に色指定 */
		y1=ycord(y); /* 開始 y座標 */
		x1=xcord(x); /* 開始 x座標 */
		y2=ycord(y+8); /* 終了 y座標 */
		x2=xcord(x+16); /* 終了 x座標 */
		g.fillRect(y1,x1,y2-y1,x2-x1); /* 指定色で塗りつぶす */
	}
function cslscroll(g,start_text_line,double_text_hight,rensyu_text_hight) /* 英文テキスト練習画面を上方に二行分スクロールする */
	{
		var	i,xx;
		var x1,x2,x3,y1,y2;
		var x0;
		var scrollImage;
		y1=ycord(0); /* スクロール範囲左端y座標 */
		y2=ycord(639); /* スクロール範囲右端y座標 */
		i=1;
		x0=xcord(start_text_line); /* スクロール先 開始 x 座標 */
		x1=xcord(start_text_line+double_text_hight); /* スクロール対象エリア 開始 x 座標 */
		x2=xcord(start_text_line+double_text_hight*7);	/* 表示消去エリア 開始 x 座標 */
		x3=xcord(start_text_line+double_text_hight*7+rensyu_text_hight);	/* スクロール対象エリア 終了 x 座標 */
		scrollImage=g.getImageData(y1,x1,y2-y1,x3-x1); /* 画面を切り取り */
		g.putImageData(scrollImage,y1,x0); /* 画面を移動して書き込み */
		g.fillStyle=MIKA_bk_color; /* 表示色に背景色を設定 */
		g.fillRect(y1,x2,y2-y1,x3-x2); /* 最下行の表示をクリア */
	}
function dispcur(g,x,y,width,color) /* 文字入力カーソルを表示、または消去 */
	{ 
		var x1,x2,y1,y2;
		var xx1,yy1;
		var i;
		cslcolor(g,color); /* 指定色に色指定 */
		y1=ycord(y); /* カーソル 左上 y 座標取得 */
		yy1=ycord(y+width)-y1; /* カーソルのy方向太さを取得 */
		if(yy1>1) yy1--; /* 太さが一以上の時は太さを一減らす */
		x1=xcord(x); /* カーソル 左上 x 座標取得 */
		xx1=xcord(x+width)-x1; /* カーソルのx方向の太さを取得 */
		if(xx1>1) xx1--;  /* 太さが一以上の時は太さを一減らす */
		y2=ycord(y+8); /* カーソル 右下 y 座標取得 */
		x2=xcord(x+16); /* カーソル 右下 x 座標取得 */
		if(color==MIKA_bk_color) g.lineWidth=3; /* 線を消去の時は太さ3で描画 */
		else
		{
			g.lineWidth=2; /* 線を表示の場合は太さ2で描画 */
		}
		g.beginPath(); /* 直線描画開始 */	
		for(i=0;i<xx1;i++) /* カーソルの横方向の上下の線を描画 */
		{
			g.moveTo(y1+1,x1+i+1); /* 描画開始位置にペン移動 */
			g.lineTo(y2-1,x1+i+1); /* 描画終了位置まで直線を描画 */
			g.moveTo(y1+1,x2-i-1); /* 描画開始位置にペン移動 */
			g.lineTo(y2-1,x2-i-1); /* 描画終了位置まで直線を描画 */
		}
		for(i=0;i<yy1;i++) /* カーソルの縦方向の左右の線を描画 */
		{
			g.moveTo(y1+i+2,x1+1); /* 描画開始位置にペン移動 */
			g.lineTo(y1+i+2,x2-1); /* 描画終了位置まで直線を描画 */
			g.moveTo(y2-i-2,x1+1); /* 描画開始位置にペン移動 */
			g.lineTo(y2-i-2,x2-1); /* 描画終了位置まで直線を描画 */
		}
		g.stroke(); /* 直線描画実行 */
	}
function dispupmes(g,flag) /* タイプ速度を更新したときのメッセージを表示 */
	{
		if(flag==0) cslcolor(g,MIKA_green); /* 表示色を緑色に設定 */
		else cslcolor(g,MIKA_bk_color); /* 表示色を背景色に設定 */
		cslput(g,20*16+8,20*8,MIKA_mesi3); /* 指定位置に「おめでとう、記録を更新しました」のメッセージを表示 */
	}
function prockiroku(g) /* 英文テキスト練習にてタイプ入力速度が前回までの最高速度を更新したかの比較を行う */
	{
		if((MIKA_type_speed_record[MIKA_type_kind_no]==0)||(MIKA_type_speed>MIKA_type_speed_record[MIKA_type_kind_no])) /* 前回までの最高入力速度を更新した場合 */
		{
			if(MIKA_type_speed_record[MIKA_type_kind_no]>0.0) /* 前回の最高入力速度がゼロより大きい場合 */
			{
				dispupmes(g,0); /* 練習記録を更新しましたのメッセージを表示 */
				MIKA_type_syuryou_flag=2; /* 練習記録更新フラグを2にセット */
			}
			else /* 前回の最高入力速度がゼロの場合 */
			{
				MIKA_type_syuryou_flag=1; /* 練習記録更新フラグを1にセット */
			}
			MIKA_type_date=getdate(); /* 最高記録達成日時文字列を指定フォーマットに従って作成 */
			MIKA_t_mojisu[MIKA_type_kind_no]=MIKA_type_count; /* 英文練習テキスト文字数保存 */
			writecookier(MIKA_cookie_kind,MIKA_type_kind_no,MIKA_type_speed,MIKA_type_word_speed,MIKA_type_date,MIKA_type_time_record[MIKA_type_kind_no]); /* クッキーに最高速度と達成日 累積練習時間を保存 */
		}
		else
		{
			writecookie(); /* クッキーに累積練習時間を保存 */
		}
	}
function roundtime(time) /* 小数点以下 切り捨て */
	{
		time=Math.floor(time);
		return time;
	}
function getmillisecond() /* プログラム開始からの経過時間をミリセコンドで取得 */
{
	var millisecond;
	millisecond=Math.floor(performance.now());
	return(millisecond);
}		
function formatmes(x,i,flag,p) /* 数値を指定文字数の文字列に変換 */
// x 変換元の数値
// i 出力文字数
// flag 小数点以下の桁数
// p パディング文字
{
	var a;
	var j;
	a=x.toFixed(flag); /* 数値を固定小数点文字列に変換 */
	j=a.length;
	if(j>=i) return(a);
	else
	return a.padStart(i,p); /* 文字pでパディング*/
}
function formatf2(x,i) /* 実数を小数点以下2桁の文字列に変換してスペースでパディングする */
{
	return formatmes(x,i,2,' ');
}
function formatf1(x,i) /* 実数を小数点以下1桁の文字列に変換してスペースでパディングする */
{
	return formatmes(x,i,1,' ');
}
function formatd(x,i) /* 実数を小数点以下0桁の整数文字列に変換してスペースでパディングする */
{
	return formatmes(x,i,0,' ');
}
function formatzd(x,i) /* 実数を小数点以下0桁の整数文字列に変換してゼロでパディングする */
{
	return formatmes(x,i,0,'0');
}
function getdate() /* yy/mm/dd の書式で日付を取得 */
{
	var x,y,m,d;
	x=new Date(); /* 日付を取得 */
	y=x.getFullYear(); /* 年を取得 */
	y=y.toString(); /* 年を文字列に変換 */
	y=y.substring(2,4); /* 年の下二桁を取得 */
	m=x.getMonth()+1; /* 月を取得 */
	d=x.getDate(); /* 日を取得 */
	return y+'/'+formatzd(m,2)+'/'+formatzd(d,2); /* yy/mm/dd の形式に日付を変換 */
}
function seisekiruiseki() /* 個別の累積練習時間の合計を計算 */
{
	var i;
	var total;
	total=0;
	for(i=0;i<6;i++)
	{
		total=total+MIKA_t_time[i]; /* 練習の各項目の累積練習時間を加算 */
	}
	return total;
}	
function seisekiclear() /* 練習成績を消去 */
{
	var i;
	var date0='00/00/00'; 
	MIKA_rt_t=0; /* 合計累積練習時間をクリア */
	for(i=0;i<6;i++) /* 成績をクリア */
	{
		MIKA_t_mojisu[i]=0; /* 練習テキスト文字数をクリア */
		MIKA_t_speed[i]=0; /* 最高入力速度 文字数／分 をクリア */
		MIKA_tw_speed[i]=0; /* 最高入力速度 ワード／分 をクリア */
		MIKA_t_date[i]=date0; /* 達成日付をクリア */
		MIKA_t_time[i]=0; /* 累積練習時間をクリア */
		MIKA_t_kaisu[i]=0; /* 練習回数をクリア */
	}	
	writecookie(); /* cookie 書き込み */
}
function writecookie()
{
	writecookier('',0,0.0,0.0,'',0); /* cookie 書き込み */
}
function writecookier(kind,ii,speed,w_speed,date,time) /* cookie に指定された記録とともに全成績を書き込み */
{
	var cookie_data="MIKATEXT=";
	var speed0;
	var w_speed0;
	var date0;
	var time0;
	var i;
	for(i=0;i<6;i++) /* 練習記録の作成 */
	{
		if(kind=='T'&&i==ii) /* 指定された記録と一致した場合 */
		{
			speed0=speed;
			w_speed0=w_speed;
			date0=date;
			time0=time;
		}
		else
		{
			speed0=MIKA_t_speed[i];
			w_speed0=MIKA_tw_speed[i];
			date0=MIKA_t_date[i];
			time0=MIKA_t_time[i];
		}
		cookie_data=cookie_data+convcoded(MIKA_t_mojisu[i],3)+convcodef1(speed0,3)+convcodef1(w_speed0,2)+convcodedate(date0,3)+convcoded(time0,4)+convcoded(MIKA_t_kaisu[i],3); /* 練習成績を圧縮して作成 */
	}
	document.cookie=cookie_data+';expires='+cookiedate(); /* cookie を有効期限一年で書き込み */
}
function cookiedate() /* cookie の有効期限一年の作成 */
{
	var date1,date2;
	date1=new Date(); /* 当日の日付時刻を取得 */
	date1.setTime(date1.getTime()+365*24*60*60*1000); /* 一年先の時刻を計算 */
	date2=date1.toUTCString(); /* UTC標準時に変換 */
	return date2;
}
function readcookie() /* cookie を読み込みんで連想配列に格納 */
{
		var i;
		var cookie0;
		MIKA_cookie=document.cookie; /* cookie 読み込み */
		if(MIKA_cookie!='') /* cookie が空でない場合 */
		{
			MIKA_cookie_array0=MIKA_cookie.split('; '); /* cookie を各項目ごとに分離して配列に格納 */
			for(i=0;i<MIKA_cookie_array0.length;i++) 
			{
				cookie0=MIKA_cookie_array0[i]; /* cookieの配列の個別データを取得 */
				cookie1=cookie0.split('='); /* cookie の個別データーを '=' 文字で分離 */
				MIKA_cookie_array1[cookie1[0].trim()]=cookie1[1].trim(); /* cookie の各項目を連想配列に格納 */
			}	
		}

}
function convcodedate(a,i) /* 最高速度達成日の日付を圧縮 */
{
	var yy,mm,dd,b;
	var x;
	yy=a.substring(0,2); /* 日付の年を取得 */
	mm=a.substring(3,3+2); /* 日付の月を取得 */
	dd=a.substring(6,6+2); /* 日付の日を取得 */
	x=Number(yy)*32*13+Number(mm)*32+Number(dd); /* 年月日を日数に変換 */
	b=convcoded(x,i); /* 日数を圧縮して変換 */
	return(b);
}
function convcodef1(i,j) /* 小数点以下一桁の数値を圧縮 */
{
	var a;
	i=i.toFixed(1); /* 小数点以下一桁に四捨五入して文字列に変換 */
	i=Number(i);  /* 文字列を数値に変換 */
	i=i*10; /* 数値を10倍 */
	i=Math.round(i); /* 小数点以下を四捨五入 */
	a=convcoded(i,j); /* 数値を圧縮して変換 */
	return a;
}
function convcoded(i,j) /* 10進数を62進数に圧縮して変換 */
// i 10進数
// j 62進数の桁数
{
	var k,l,m;
	var a;
	k=MIKA_code.length; /* 62進数テーブルの文字列長を取得 */
	a=''; 
	i=Math.floor(i); /* 変換する数値を整数にする */
	for(l=0;l<j;l++)
	{	m=i%k; /* 各桁の数値を計算 */
		i=(i-m)/k;
		a=a+MIKA_code[m]; /* 対応する62進数文字を設定 */
	}
	return a;
}
function convcookie() /* cookie の連想配列データーを成績に変換して格納 */
{
	var time;
	var mojisu0,speed0,w_speed0,date0,time0,kaisu0;
	var i,ii;
	var a;
	if('MIKATEXT' in MIKA_cookie_array1) /* 連想配列に 'MIKATEXT'があった場合 */
	{
		a=MIKA_cookie_array1['MIKATEXT']
		ii=0;
		for(i=0;i<6;i++) /* 成績を変換 */
		{
			mojisu0=a.substring(ii,ii+3); /* 練習テキスト文字数を取得 */
			MIKA_t_mojisu[i]=convdecoded(mojisu0); /* 練習テキスト文字数を62進数から10進数に変換 */
			ii=ii+3;
			speed0=a.substring(ii,ii+3); /* 最高入力速度 文字数／分 を取得 */
			MIKA_t_speed[i]=convdecodef1(speed0); /* 最高入力速度 文字数／分 を62進数から10進数に変換 */
			ii=ii+3;
			w_speed0=a.substring(ii,ii+2); /* 最高入力速度 ワード／分 を取得 */
			MIKA_tw_speed[i]=convdecodef1(w_speed0); /* 最高入力速度 ワード／分 を62進数から10進数に変換 */
			ii=ii+2;
			date0=a.substring(ii,ii+3); /* 達成日付を取得 */
			MIKA_t_date[i]=convdecodedate(date0); /* 達成日付を62進数から10進数に変換 */
			ii=ii+3;
			time0=a.substring(ii,ii+4); /* 累積練習時間を取得 */
			ii=ii+4;
			MIKA_t_time[i]=convdecoded(time0); /* 累積練習時間を62進数から10進数に変換 */
			kaisu0=a.substring(ii,ii+3); /* 練習回数を取得 */
			ii=ii+3;
			MIKA_t_kaisu[i]=convdecoded(kaisu0); /* 練習回数を62進数から10進数に変換 */
		}
	}
}
function convdecoded(a) /* 62進数文字列を10進数に変換 */
{
	var i,ii,j,k,l,m;
	var b;
	i=a.length; /* 62進数文字列の長さを取得 */
	ii=MIKA_code.length; /* 62進数テーブルの文字列長を取得 */
	j=0;
	m=1;
	for(k=0;k<i;k++)
	{
		b=a[k]; /* 62進数の一桁を取得 */
		l=cfind(b,MIKA_code); /* 62進数に対応する10進数を取得 */
		if(l>0) l=l-1;
		j=j+l*m; /* 62進数を10進数に変換 */
		m=m*ii;
	}
	return (j);
}
function convdecodef1(a) /* 62進数文字列を小数点以下一桁の実数に変換 */
{
	var b;
	b=convdecoded(a); /* 62進数文字列を10進数に変換 */
	b=b/10.0; /* 整数を小数点以下一桁の実数に変換 */
	return(b);
}	
function convdecodedate(a) /* 62進数文字列を年月日に変換 */
{
	var yy,mm,dd;
	var b;
	var c;
	b=convdecoded(a);  /* 62進数文字列を10進数に変換 */
	dd=b%32; /* 日付を計算 */
	b=(b-dd)/32;
	mm=b%13; /* 月を計算 */
	yy=(b-mm)/13; /* 年を計算 */
	c=formatzd(yy,2)+'/'+formatzd(mm,2)+'/'+formatzd(dd,2); /* 年月日をYY/MM/DDの文字列に変換 */
	return(c);
}
function Procttimer(g) /* 入力速度表示用タイマー */
{
	MIKA_sec_count++; /* 秒カウンター インクリメント */
	if(MIKA_practice_end_flag==0) /* 練習実行中の場合 */
	{
			MIKA_type_end_time=MIKA_type_start_time+MIKA_sec_count*1000; /* 現在時刻をミリ秒で計算 */
			MIKA_ttype_speed_time=MIKA_sec_count; /* 経過秒を設定 */
			if(MIKA_type_speed_time!=MIKA_ttype_speed_time)
			{
				procdispspeed3(g); /* 英文テキスト練習の入力速度を表示 */
			}
	}
//				System.out.printf("Timer task\n");
}
