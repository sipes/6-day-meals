/* Simple 6-day meal plan app for GitHub Pages.
   - No backend
   - Shopping list checkboxes persist via localStorage
   - Adds separate tab for Wife (GF) using same recipes (no double cooking)
*/

const STORAGE_KEY = "mealplan_ticks_v1";

const PROFILE_ME = "me";
const PROFILE_WIFE = "wife";
let activeProfile = PROFILE_ME;

const profileMeta = {
  me: {
    label: "Plan (Me)",
    note: "Target: ~2300 kcal/day overall. Lunch carbs ½–1 cup cooked, protein-first."
  },
  wife: {
    label: "Wife (GF)",
    note: "Target: ~6334 kJ/day (~1515 kcal). Same meals, smaller portions + gluten-free swaps."
  }
};

const plan = [
  {
    day: "Day 1 (Mon)",
    lunch: {
      title: "Chicken + Roast Veg Bowl",
      badge: "Protein-first • Controlled carbs",
      ingredients: [
        "Chicken",
        "Peppers, carrots, zucchini",
        "Quinoa OR basmati rice",
        "Olive oil, lemon, salt, pepper"
      ],
      steps: [
        "Roast chopped veg at 200°C for ~25 min (olive oil + salt).",
        "Grill/pan-fry chicken with salt + pepper.",
        "Combine with cooked quinoa/rice. Add lemon + olive oil."
      ],
      portions: {
        me: "Chicken ~200g cooked. Carbs: ½–1 cup cooked quinoa/rice. Veg: plenty.",
        wife: "Chicken ~130–150g cooked. Carbs: ¼–⅓ cup cooked quinoa/rice. Veg: plenty."
      },
      gfSwaps: [] // already GF
    },
    dinner: {
      title: "Salmon + Sweet Potato + Green Beans",
      badge: "Steady energy • Filling",
      ingredients: [
        "Salmon fillet",
        "Sweet potato",
        "Green beans OR asparagus",
        "Olive oil, salt, pepper"
      ],
      steps: [
        "Bake salmon ~12–15 min (salt, pepper, splash of olive oil).",
        "Roast sweet potato cubes ~25 min.",
        "Steam green beans/asparagus and drizzle olive oil."
      ],
      portions: {
        me: "Salmon 1 fillet. Sweet potato: ½ medium. Veg: plenty.",
        wife: "Salmon 1 smaller fillet (or ~¾). Sweet potato: ¼–⅓ medium. Veg: plenty."
      },
      gfSwaps: []
    }
  },
  {
    day: "Day 2 (Tue)",
    lunch: {
      title: "Chicken + Chickpea Salad",
      badge: "No-cook assemble (if chicken prepped)",
      ingredients: [
        "Cooked chicken pieces",
        "Chickpeas",
        "Tomato + cucumber + salad greens",
        "Feta (optional)",
        "Olive oil + vinegar/lemon"
      ],
      steps: [
        "Add salad greens, chopped tomato + cucumber.",
        "Add chicken + chickpeas. Sprinkle feta if using.",
        "Dress with olive oil + vinegar/lemon, salt + pepper."
      ],
      portions: {
        me: "Chicken: generous portion. Chickpeas: ~½ cup. Big salad base.",
        wife: "Chicken: smaller portion. Chickpeas: ~¼ cup. Big salad base."
      },
      gfSwaps: [] // already GF
    },
    dinner: {
      title: "Beef Mince + Cauliflower Mash",
      badge: "Comfort food • Low crash",
      ingredients: [
        "Lean beef mince",
        "Onion + garlic",
        "Paprika/cumin (or your spice mix)",
        "Cauliflower (for mash)",
        "Side salad"
      ],
      steps: [
        "Brown onion + garlic, add mince and spices; cook through.",
        "Boil/steam cauliflower; mash with salt + a bit of olive oil.",
        "Serve mince over mash with a side salad."
      ],
      portions: {
        me: "Mince: ~200g cooked portion. Mash: big scoop.",
        wife: "Mince: ~130–150g cooked portion. Mash: smaller scoop."
      },
      gfSwaps: [] // already GF
    }
  },
  {
    day: "Day 3 (Wed)",
    lunch: {
      title: "Egg Omelette + Rye Toast",
      badge: "Anti-crash lunch",
      ingredients: [
        "Eggs",
        "Mushrooms + spinach",
        "Toast (rye or GF)",
        "Avocado (optional)"
      ],
      steps: [
        "Cook mushrooms, add spinach until wilted.",
        "Add beaten eggs, cook gently, fold.",
        "Serve with toast (and avocado if desired)."
      ],
      portions: {
        me: "3 eggs. 1 slice rye toast. (Avocado optional)",
        wife: "2–3 eggs. GF bread OR corn cakes OR skip bread."
      },
      gfSwaps: [
        "Rye toast → GF seeded bread (wife) OR corn cakes"
      ]
    },
    dinner: {
      title: "Chicken Stir Fry (Half Rice Rule)",
      badge: "Double veg • Half starch",
      ingredients: [
        "Chicken strips",
        "Frozen stir-fry veg mix (no broccoli mix)",
        "Tamari (GF soy sauce)",
        "Cooked rice"
      ],
      steps: [
        "Pan-fry chicken strips until cooked.",
        "Add veg mix, stir-fry until hot and tender-crisp.",
        "Add tamari. Serve with cooked rice."
      ],
      portions: {
        me: "Rice: ½ cup cooked. Protein: generous chicken portion. Veg: lots.",
        wife: "Rice: ¼ cup cooked. Protein: smaller portion. Veg: lots."
      },
      gfSwaps: [
        "Soy sauce → Tamari (GF soy sauce)"
      ]
    }
  },
  {
    day: "Day 4 (Thu)",
    lunch: {
      title: "Greek Yogurt Power Bowl",
      badge: "Fast • High satiety",
      ingredients: [
        "Plain Greek yogurt",
        "Berries",
        "Chia seeds",
        "Nuts"
      ],
      steps: [
        "Mix yogurt with chia.",
        "Top with berries + nuts.",
        "Optional: cinnamon for flavour."
      ],
      portions: {
        me: "Yogurt: ~250g. Nuts: small handful. Chia: 1 tbsp.",
        wife: "Yogurt: ~170–200g. Nuts: 1 tbsp. Chia: 1 tbsp."
      },
      gfSwaps: [] // GF (just ensure yogurt is plain)
    },
    dinner: {
      title: "Steak Salad + Roast Butternut",
      badge: "Big salad • Controlled carbs",
      ingredients: [
        "Lean steak",
        "Salad greens + cucumber + tomato",
        "Butternut/pumpkin (roasted)",
        "Olive oil + vinegar/lemon"
      ],
      steps: [
        "Roast butternut/pumpkin until soft and caramelised.",
        "Cook steak to preference; rest then slice.",
        "Serve over a big salad with olive oil dressing."
      ],
      portions: {
        me: "Steak: ~200g cooked portion. Roast butternut: medium portion.",
        wife: "Steak: ~130–150g cooked portion. Roast butternut: smaller portion."
      },
      gfSwaps: [] // already GF
    }
  },
  {
    day: "Day 5 (Fri)",
    lunch: {
      title: "Chicken Wrap",
      badge: "Easy office lunch",
      ingredients: [
        "Wrap (low-carb OR gluten-free) / lettuce wrap option",
        "Cooked chicken",
        "Hummus",
        "Lettuce + tomato + cucumber"
      ],
      steps: [
        "Spread hummus on wrap.",
        "Add chicken + salad veg.",
        "Roll tight. Done."
      ],
      portions: {
        me: "1 wrap + solid chicken portion.",
        wife: "1 smaller GF wrap OR lettuce wrap + smaller chicken portion."
      },
      gfSwaps: [
        "Wrap → GF wrap (wife) OR lettuce wrap"
      ]
    },
    dinner: {
      title: "Lentil + Chicken Soup (Big Volume)",
      badge: "Batch cook • Great leftovers",
      ingredients: [
        "Lentils (½ cup dry) OR canned lentils",
        "Shredded chicken",
        "Carrot + celery + onion + garlic",
        "Stock cube (check GF label)",
        "Spinach (optional)"
      ],
      steps: [
        "Sauté onion/celery/carrot/garlic for 5–7 min.",
        "Add lentils + water/stock; simmer until tender (30–40 min for dry).",
        "Add chicken (and spinach at the end). Season to taste."
      ],
      portions: {
        me: "Big bowl allowed. Bread optional.",
        wife: "Medium bowl. If adding bread: GF only or skip."
      },
      gfSwaps: [
        "Stock cubes → choose GF-labelled stock"
      ]
    }
  },
  {
    day: "Day 6 (Sat)",
    lunch: {
      title: "Leftovers OR Protein Salad Bowl",
      badge: "Keep it simple",
      ingredients: [
        "Leftover soup/stir-fry OR cooked chicken/eggs",
        "Salad greens + cucumber + tomato",
        "Avocado + olive oil dressing"
      ],
      steps: [
        "Use leftovers (best option), add side salad.",
        "Or build a big salad bowl with chicken/eggs + avocado."
      ],
      portions: {
        me: "Leftovers + side salad. Or big chicken/egg salad bowl.",
        wife: "Leftovers + side salad. Or smaller chicken/egg salad bowl."
      },
      gfSwaps: [] // GF
    },
    dinner: {
      title: "Fish + Veg Tray Bake",
      badge: "One tray • Minimal mess",
      ingredients: [
        "White fish (hake/other)",
        "Zucchini + peppers + green beans",
        "Olive oil + herbs",
        "Lemon"
      ],
      steps: [
        "Roast veg with olive oil + herbs for ~20 min at 200°C.",
        "Add fish, bake ~10–12 min more.",
        "Finish with lemon."
      ],
      portions: {
        me: "Fish: full portion. Veg: lots.",
        wife: "Fish: slightly smaller portion. Veg: lots."
      },
      gfSwaps: [] // GF
    }
  }
];

const shoppingList = {
  "Protein": [
    "Chicken (1.5–2 kg)",
    "Salmon fillets (2)",
    "White fish (2–3 portions)",
    "Lean beef mince (500–700g)",
    "Lean steak (2 portions)",
    "Eggs (18)"
  ],
  "Carbs (controlled portions)": [
    "Basmati rice OR quinoa",
    "Sweet potatoes (3–4)",
    "Lentils (dry or canned)",
    "Chickpeas (2 cans)"
  ],
  "Bread / wraps (options)": [
    "Rye bread (me)",
    "GF seeded bread (wife)",
    "Wraps: low-carb OR gluten-free wraps",
    "Corn cakes (optional GF bread swap)"
  ],
  "Vegetables": [
    "Green beans OR asparagus",
    "Spinach",
    "Mushrooms",
    "Peppers",
    "Zucchini/baby marrow",
    "Carrots",
    "Onion + garlic",
    "Celery",
    "Cucumber",
    "Tomatoes",
    "Salad greens",
    "Pumpkin/butternut"
  ],
  "Healthy fats": [
    "Olive oil",
    "Avocados (3–4)",
    "Nuts (almonds/walnuts)",
    "Chia seeds"
  ],
  "Dairy / extras": [
    "Greek yogurt (large tub)",
    "Feta (optional)",
    "Hummus"
  ],
  "Pantry / flavour (GF-friendly)": [
    "Tamari (GF soy sauce)",
    "Curry powder (optional)",
    "Paprika + cumin (or spice mix)",
    "Stock cubes (check GF label)",
    "Salt + pepper",
    "Vinegar and/or lemons"
  ]
};

function loadTicks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}
function saveTicks(ticks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ticks));
}

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "class") node.className = v;
    else if (k === "html") node.innerHTML = v;
    else node.setAttribute(k, v);
  });
  children.forEach(c => node.appendChild(c));
  return node;
}

function renderDaySelect() {
  const select = document.getElementById("daySelect");
  select.innerHTML = "";
  plan.forEach((d, idx) => {
    const opt = document.createElement("option");
    opt.value = String(idx);
    opt.textContent = d.day;
    select.appendChild(opt);
  });
  select.addEventListener("change", () => renderDay(parseInt(select.value, 10)));
}

function renderMealBlock(meal, label, profile) {
  const block = el("div", { class: "mealBlock" });

  const titleRow = el("div", { class: "mealTitle" }, [
    el("h3", { html: `${label}: ${meal.title}` }),
    el("span", { class: "badge" }, [document.createTextNode(meal.badge || "")])
  ]);
  block.appendChild(titleRow);

  if (meal.portions && meal.portions[profile]) {
    block.appendChild(
      el("p", {
        class: "hint",
        html: `<strong>Portion guide:</strong> ${meal.portions[profile]}`
      })
    );
  }

  if (profile === PROFILE_WIFE && meal.gfSwaps && meal.gfSwaps.length) {
    block.appendChild(el("div", { class: "hint", html: "<strong>Gluten-free swaps:</strong>" }));
    const swapList = el("ul");
    meal.gfSwaps.forEach(s => swapList.appendChild(el("li", { html: s })));
    block.appendChild(swapList);
  }

  block.appendChild(el("h4", { html: "Ingredients" }));
  const ing = el("ul");
  meal.ingredients.forEach(i => ing.appendChild(el("li", { html: i })));
  block.appendChild(ing);

  block.appendChild(el("h4", { html: "Steps" }));
  const steps = el("ol");
  meal.steps.forEach(s => steps.appendChild(el("li", { html: s })));
  block.appendChild(steps);

  return block;
}

function renderDay(idx) {
  const dayContent = document.getElementById("dayContent");
  dayContent.innerHTML = "";
  const d = plan[idx];

  dayContent.appendChild(
    el("p", {
      class: "hint",
      html: `<strong>${profileMeta[activeProfile].label}:</strong> ${profileMeta[activeProfile].note}`
    })
  );

  dayContent.appendChild(renderMealBlock(d.lunch, "Lunch", activeProfile));
  dayContent.appendChild(renderMealBlock(d.dinner, "Dinner", activeProfile));
}

function renderShopping() {
  const ticks = loadTicks();
  const root = document.getElementById("shoppingContent");
  root.innerHTML = "";

  const grid = el("div", { class: "grid" });
  Object.entries(shoppingList).forEach(([groupName, items]) => {
    const group = el("div", { class: "group" });
    group.appendChild(el("h3", { html: groupName }));

    items.forEach(item => {
      const id = `${groupName}__${item}`;
      const checked = !!ticks[id];

      const checkbox = el("input", { type: "checkbox" });
      checkbox.checked = checked;
      checkbox.addEventListener("change", () => {
        const next = loadTicks();
        next[id] = checkbox.checked;
        saveTicks(next);
      });

      const label = el("label", { class: "checkItem" }, [
        checkbox,
        el("span", { html: item })
      ]);

      group.appendChild(label);
    });

    grid.appendChild(group);
  });

  root.appendChild(grid);
}

function showView(view) {
  const viewPlan = document.getElementById("viewPlan");
  const viewShop = document.getElementById("viewShop");
  if (view === "plan") {
    viewPlan.classList.remove("hidden");
    viewShop.classList.add("hidden");
  } else {
    viewShop.classList.remove("hidden");
    viewPlan.classList.add("hidden");
  }
}

function setActiveTab(tab) {
  const btnPlan = document.getElementById("btnPlan");
  const btnWife = document.getElementById("btnWife");

  // These buttons may not exist if HTML not updated yet; guard anyway.
  if (btnPlan) btnPlan.classList.remove("primary");
  if (btnWife) btnWife.classList.remove("primary");

  if (tab === "me") {
    if (btnPlan) btnPlan.classList.add("primary");
  } else if (tab === "wife") {
    if (btnWife) btnWife.classList.add("primary");
  }
}

function resetTicks() {
  localStorage.removeItem(STORAGE_KEY);
  renderShopping();
}

function init() {
  renderDaySelect();
  renderDay(0);
  renderShopping();

  document.getElementById("btnPlan").addEventListener("click", () => {
    activeProfile = PROFILE_ME;
    setActiveTab("me");
    showView("plan");
    renderDay(parseInt(document.getElementById("daySelect").value, 10));
  });

  // Wife tab (requires the btnWife button in index.html)
  const wifeBtn = document.getElementById("btnWife");
  if (wifeBtn) {
    wifeBtn.addEventListener("click", () => {
      activeProfile = PROFILE_WIFE;
      setActiveTab("wife");
      showView("plan");
      renderDay(parseInt(document.getElementById("daySelect").value, 10));
    });
  }

  document.getElementById("btnShop").addEventListener("click", () => {
    renderShopping();
    showView("shop");
  });

  document.getElementById("btnPrint").addEventListener("click", () => window.print());
  document.getElementById("btnReset").addEventListener("click", resetTicks);

  // default highlighting
  setActiveTab("me");
}

document.addEventListener("DOMContentLoaded", init);
