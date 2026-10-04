(function () {
  "use strict";

  var form = document.getElementById("bench-form");
  if (!form) return;
  var query = document.getElementById("bench-query");
  var results = document.getElementById("bench-results");
  var message = document.getElementById("bench-message");

  var definitions = {
    mm: ["length", 0.001, "mm"],
    millimeter: ["length", 0.001, "mm"],
    millimetre: ["length", 0.001, "mm"],
    cm: ["length", 0.01, "cm"],
    centimeter: ["length", 0.01, "cm"],
    centimetre: ["length", 0.01, "cm"],
    m: ["length", 1, "m"],
    meter: ["length", 1, "m"],
    metre: ["length", 1, "m"],
    km: ["length", 1000, "km"],
    kilometer: ["length", 1000, "km"],
    kilometre: ["length", 1000, "km"],
    in: ["length", 0.0254, "in"],
    inch: ["length", 0.0254, "in"],
    inches: ["length", 0.0254, "in"],
    ft: ["length", 0.3048, "ft"],
    foot: ["length", 0.3048, "ft"],
    feet: ["length", 0.3048, "ft"],
    yd: ["length", 0.9144, "yd"],
    yard: ["length", 0.9144, "yd"],
    yards: ["length", 0.9144, "yd"],
    g: ["mass", 0.001, "g"],
    gram: ["mass", 0.001, "g"],
    grams: ["mass", 0.001, "g"],
    kg: ["mass", 1, "kg"],
    kilogram: ["mass", 1, "kg"],
    kilograms: ["mass", 1, "kg"],
    oz: ["mass", 0.028349523125, "oz"],
    ounce: ["mass", 0.028349523125, "oz"],
    ounces: ["mass", 0.028349523125, "oz"],
    lb: ["mass", 0.45359237, "lb"],
    lbs: ["mass", 0.45359237, "lb"],
    pound: ["mass", 0.45359237, "lb"],
    pounds: ["mass", 0.45359237, "lb"],
    ml: ["liquid", 0.001, "mL"],
    milliliter: ["liquid", 0.001, "mL"],
    millilitre: ["liquid", 0.001, "mL"],
    l: ["liquid", 1, "L"],
    liter: ["liquid", 1, "L"],
    litre: ["liquid", 1, "L"],
    floz: ["liquid", 0.0295735295625, "US fl oz"],
    gal: ["liquid", 3.785411784, "US gal"],
    gallon: ["liquid", 3.785411784, "US gal"],
    c: ["temperature", 1, "°C"],
    celsius: ["temperature", 1, "°C"],
    f: ["temperature", 1, "°F"],
    fahrenheit: ["temperature", 1, "°F"],
    k: ["temperature", 1, "K"],
    kelvin: ["temperature", 1, "K"],
  };
  var groups = {
    length: [
      ["mm", "mm"],
      ["cm", "cm"],
      ["m", "m"],
      ["in", "in"],
      ["ft", "ft"],
    ],
    mass: [
      ["g", "g"],
      ["kg", "kg"],
      ["oz", "oz"],
      ["lb", "lb"],
    ],
    liquid: [
      ["ml", "mL"],
      ["l", "L"],
      ["floz", "US fl oz"],
      ["gal", "US gal"],
    ],
  };
  function display(number) {
    if (!Number.isFinite(number)) return "—";
    return new Intl.NumberFormat(undefined, {
      maximumFractionDigits: Math.abs(number) < 0.01 ? 6 : 3,
    }).format(number);
  }
  function unitOf(raw) {
    var key = raw.toLowerCase().replace(/°/g, "").replace(/\s+/g, "");
    if (key.length > 3 && key.endsWith("s") && !definitions[key])
      key = key.slice(0, -1);
    return definitions[key];
  }
  function onePart(text, fallback) {
    var normalized = text.trim().replace(/(\d),(?=\d{3}(?:\D|$))/g, "$1");
    normalized = normalized.replace(/fl\s*oz/gi, "floz");
    var pattern = /([+-]?(?:\d+(?:\.\d*)?|\.\d+))\s*(°?\s*[a-zA-Z]+)?/g;
    var terms = [],
      position = 0,
      match;
    while ((match = pattern.exec(normalized))) {
      if (normalized.slice(position, match.index).trim()) return null;
      var unit = match[2] ? unitOf(match[2]) : fallback;
      if (!unit) return null;
      var value = Number(match[1]);
      if (!Number.isFinite(value)) return null;
      terms.push({ value: value, unit: unit });
      position = pattern.lastIndex;
    }
    if (!terms.length || normalized.slice(position).trim()) return null;
    var type = terms[0].unit[0];
    if (
      terms.some(function (term) {
        return term.unit[0] !== type;
      })
    )
      return null;
    if (type === "temperature" && terms.length !== 1) return null;
    if (
      terms.some(function (term) {
        return term.value < 0;
      }) &&
      type !== "temperature"
    )
      return null;
    return {
      type: type,
      terms: terms,
      base: terms.reduce(function (sum, term) {
        return sum + term.value * term.unit[1];
      }, 0),
    };
  }
  function parse(text) {
    var parts = text.trim().split(/\s*(?:×|x|\*)\s*/i);
    if (
      parts.length > 3 ||
      parts.some(function (part) {
        return !part.trim();
      })
    )
      return null;
    var lastUnitMatch = parts[parts.length - 1].match(/(?:°?\s*[a-zA-Z]+)\s*$/);
    var fallback = lastUnitMatch ? unitOf(lastUnitMatch[0]) : null;
    var parsed = parts.map(function (part) {
      return onePart(part, fallback);
    });
    if (
      parsed.some(function (part) {
        return !part;
      })
    )
      return null;
    if (
      parts.length > 1 &&
      parsed.some(function (part) {
        return part.type !== "length";
      })
    )
      return null;
    return parsed;
  }
  function add(value, label) {
    var output = document.createElement("output");
    var strong = document.createElement("strong");
    var span = document.createElement("span");
    strong.textContent = value;
    span.textContent = label;
    output.appendChild(strong);
    output.appendChild(span);
    results.appendChild(output);
  }
  function render() {
    var text = query.value.trim();
    results.replaceChildren();
    if (!text) {
      message.textContent =
        "Type a measurement to start. BENCH is a planning aid; verify critical dimensions against your measuring tools.";
      return;
    }
    var parts = parse(text);
    if (!parts) {
      message.textContent =
        "Try a number with a supported unit, such as 12 in, 2.5 kg, 72 °F, or 120 × 80 mm. Use × between dimensions.";
      return;
    }
    if (parts.length > 1) {
      var metres = parts.map(function (part) {
        return part.base;
      });
      add(
        metres
          .map(function (value) {
            return display(value * 1000);
          })
          .join(" × ") + " mm",
        "Dimensions",
      );
      add(display(metres[0] * metres[1] * 10000) + " cm²", "Area");
      if (parts.length === 3)
        add(
          display(metres[0] * metres[1] * metres[2] * 1000000) + " cm³",
          "Volume",
        );
      message.textContent =
        "Dimensions converted. Area and volume are geometric estimates; verify the physical build.";
      return;
    }
    var item = parts[0],
      type = item.type;
    if (type === "temperature") {
      var source = item.terms[0],
        code = source.unit[2];
      var celsius =
        code === "°C"
          ? source.value
          : code === "°F"
            ? ((source.value - 32) * 5) / 9
            : source.value - 273.15;
      if (celsius < -273.15) {
        message.textContent = "Temperature cannot be below absolute zero.";
        return;
      }
      add(display(celsius) + " °C", "Celsius");
      add(display((celsius * 9) / 5 + 32) + " °F", "Fahrenheit");
      add(display(celsius + 273.15) + " K", "Kelvin");
    } else {
      groups[type].forEach(function (target) {
        add(
          display(item.base / definitions[target[0]][1]) + " " + target[1],
          target[1],
        );
      });
    }
    message.textContent =
      "Converted locally in your browser. Check critical dimensions against your measuring tools.";
  }
  form.addEventListener("input", render);
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    render();
  });
  render();
})();
