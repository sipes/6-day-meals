/* Simple 6-day meal plan app for GitHub Pages.
   - No backend
   - Shopping list checkboxes persist via localStorage
*/

const STORAGE_KEY = "mealplan_ticks_v1";

const plan = [
  {
    day: "Day 1 (Mon)",
    lunch: {
      title: "Chicken + Roast Veg Bowl",
      badge: "Protein-first • Controlled carbs",
      ingredients: [
        "Chicken (200g cooked)",
        "Peppers, carrots, zucchini",
        "½ cup cooked quinoa OR basmati rice",
        "Olive oil, lemon, salt, pepper"
      ],
      steps: [
        "Roast chopped veg at 200°C for ~25 min (olive oil + salt).",
        "Grill/pan-fry chicken with salt + pepper.",
        "Combine with ½ cup cooked quinoa/rice. Add lemon + olive oil."
      ]
    },
    dinner: {
      title: "Salmon + Sweet Potato + Green Beans",
      badge: "Steady energy • Filling",
      ingredients: [
        "Salmon fillet",
        "½ sweet potato",
        "Green beans OR asparagus",
        "Olive oil, salt, pepper"
      ],
      steps: [
        "Bake salmon ~12–15 min (salt, pepper, splash of olive oil).",
        "Roast sweet potato cubes ~25 min.",
        "Steam green beans/asparagus and drizzle olive oil."
      ]
    }
  },
  {
    day: "Day 2 (Tue)",
    lunch: {
      title: "Chicken + Chickpea Salad",
      badge: "No-cook assemble (if chicken prepped)",
      ingredients: [
        "Cooked chicken pieces",
        "½ cup chickpeas",
        "Tomato + cucumber + salad greens",
        "Feta (optional)",
        "Olive oil + vinegar/lemon"
      ],
      steps: [
        "Add salad greens, chopped tomato + cucumber.",
        "Add chicken + chickpeas. Sprinkle feta if using.",
        "Dress with olive oil + vinegar/lemon, salt + pepper."
      ]
    },
    dinner: {
      title: "Beef Mince + Cauliflower Mash",
      badge: "Comfort food • Low crash",
      ingredients: [
        "Lean beef mince (200g cooked portion)",
        "Onion + garlic",
        "Paprika/cumin (or your spice mix)",
        "Cauliflower (for mash)",
        "Side salad"
      ],
      steps: [
        "Brown onion + garlic, add mince and spices; cook through.",
        "Boil/steam cauliflower; mash with salt + a bit of olive oil.",
        "Serve mince over mash with a side salad."
      ]
    }
  },
  {
    day: "Day 3 (Wed)",
    lunch: {
      title: "Egg Omelette + Rye Toast",
      badge: "Anti-crash lunch",
      ingredients: [
        "3 eggs",
        "Mushrooms + spinach",
        "1 slice rye toast",
        "Avocado (optional)"
      ],
      steps: [
        "Cook mushrooms, add spinach until wilted.",
        "Add beaten eggs, cook gently, fold.",
        "Serve with 1 slice rye toast (and avocado if desired)."
      ]
    },
    dinner: {
      title: "Chicken Stir Fry (Half Rice Rule)",
      badge: "Double veg • Half starch",
      ingredients: [
        "Chicken strips",
        "Frozen stir-fry veg mix (no broccoli mix)",
        "Soy sauce",
        "½ cup cooked rice"
      ],
      steps: [
        "Pan-fry chicken strips until cooked.",
        "Add veg mix, stir-fry until hot and tender-crisp.",
        "Add soy sauce. Serve with ½ cup cooked rice."
      ]
    }
  },
  {
    day: "Day 4 (Thu)",
    lunch: {
      title: "Greek Yogurt Power Bowl",
      badge: "Fast • High satiety",
      ingredients: [
        "250g plain Greek yogurt",
        "Berries",
        "1 tbsp chia seeds",
        "Handful nuts"
      ],
      steps: [
        "Mix yogurt with chia.",
        "Top with berries + nuts.",
        "Optional: cinnamon for flavour."
      ]
    },
    dinner: {
      title: "Steak Salad + Roast Butternut",
      badge: "Big salad • Controlled carbs",
      ingredients: [
        "Lean steak (200g cooked portion)",
        "Salad greens + cucumber + tomato",
        "Butternut/pumpkin (roasted)",
        "Olive oil + vinegar/lemon"
      ],
      steps: [
        "Roast butternut/pumpkin until soft and caramelised.",
        "Cook steak to preference; rest then slice.",
        "Serve over a big salad with olive oil dressing."
      ]
    }
  },
  {
    day: "Day 5 (Fri)",
    lunch: {
      title: "Chicken Wrap (Low Carb)",
      badge: "Easy office lunch",
      ingredients: [
        "Low-carb wrap",
        "Cooked chicken",
        "Hummus",
        "Lettuce + tomato + cucumber"
      ],
      steps: [
        "Spread hummus on wrap.",
        "Add chicken + salad veg.",
        "Roll tight. Done."
      ]
    },
    dinner: {
      title: "Lentil + Chicken Soup (Big Volume)",
      badge: "Batch cook • Great leftovers",
      ingredients: [
        "Lentils (½ cup dry) OR canned lentils",
        "Shredded chicken",
        "Carrot + celery + onion + garlic",
        "Stock cube",
        "Spinach (optional)"
      ],
      steps: [
        "Sauté onion/celery/carrot/garlic for 5–7 min.",
        "Add lentils + water/stock; simmer until tender (30–40 min for dry).",
        "Add chicken (and spinach at the end). Season to taste."
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
      ]
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
      ]
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
    "Chickpeas (2 cans)",
    "Rye bread OR low-carb wraps"
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
  "Pantry / flavour": [
    "Soy sauce",
    "Curry powder (optional)",
    "Paprika + cumin (or spice mix)",
    "Stock cubes",
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

function renderMealBlock(meal, label) {
  const block = el("div", { class: "mealBlock" });

  const titleRow = el("div", { class: "mealTitle" }, [
    el("h3", { html: `${label}: ${meal.title}` }),
    el("span", { class: "badge" }, [document.createTextNode(meal.badge || "")])
  ]);
  block.appendChild(titleRow);

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

  dayContent.appendChild(renderMealBlock(d.lunch, "Lunch"));
  dayContent.appendChild(renderMealBlock(d.dinner, "Dinner"));
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

function resetTicks() {
  localStorage.removeItem(STORAGE_KEY);
  renderShopping();
}

function init() {
  renderDaySelect();
  renderDay(0);
  renderShopping();

  document.getElementById("btnPlan").addEventListener("click", () => showView("plan"));
  document.getElementById("btnShop").addEventListener("click", () => {
    renderShopping();
    showView("shop");
  });
  document.getElementById("btnPrint").addEventListener("click", () => window.print());
  document.getElementById("btnReset").addEventListener("click", resetTicks);
}

document.addEventListener("DOMContentLoaded", init);
