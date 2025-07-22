import { getMdcConfigs } from './mdc-configs.mjs';
import { createWasmOnigEngine } from 'shiki/engine/oniguruma';

function createShikiHighlighter({
  langs = [],
  themes = [],
  bundledLangs = {},
  bundledThemes = {},
  getMdcConfigs,
  options: shikiOptions,
  engine
} = {}) {
  let shiki;
  let configs;
  async function _getShiki() {
    const { createHighlighterCore, addClassToHast, isSpecialLang, isSpecialTheme } = await import('shiki/core');
    const { transformerNotationDiff, transformerNotationErrorLevel, transformerNotationFocus, transformerNotationHighlight } = await import('@shikijs/transformers');
    const shiki2 = await createHighlighterCore({
      langs,
      themes,
      engine
    });
    for await (const config of await getConfigs()) {
      await config.shiki?.setup?.(shiki2);
    }
    return {
      shiki: shiki2,
      addClassToHast,
      isSpecialLang,
      isSpecialTheme,
      transformers: [
        transformerNotationDiff(),
        transformerNotationErrorLevel(),
        transformerNotationFocus(),
        transformerNotationHighlight()
      ]
    };
  }
  async function getShiki() {
    if (!shiki) {
      shiki = _getShiki();
    }
    return shiki;
  }
  async function getConfigs() {
    if (!configs) {
      configs = Promise.resolve(getMdcConfigs?.() || []);
    }
    return configs;
  }
  const highlighter = async (code, lang, theme, options = {}) => {
    const {
      shiki: shiki2,
      addClassToHast,
      isSpecialLang,
      isSpecialTheme,
      transformers: baseTransformers
    } = await getShiki();
    const codeToHastOptions = {
      defaultColor: false,
      meta: {
        __raw: options.meta
      }
    };
    if (lang === "ts-type" || lang === "typescript-type") {
      lang = "typescript";
      codeToHastOptions.grammarContextCode = "let a:";
    } else if (lang === "vue-html" || lang === "vue-template") {
      lang = "vue";
      codeToHastOptions.grammarContextCode = "<template>";
    }
    const themesObject = { ...typeof theme === "string" ? { default: theme } : theme || {} };
    const loadedThemes = shiki2.getLoadedThemes();
    const loadedLanguages = shiki2.getLoadedLanguages();
    if (typeof lang === "string" && !loadedLanguages.includes(lang) && !isSpecialLang(lang)) {
      if (bundledLangs[lang]) {
        await shiki2.loadLanguage(bundledLangs[lang]);
      } else {
        lang = "text";
      }
    }
    for (const [color, theme2] of Object.entries(themesObject)) {
      if (typeof theme2 === "string" && !loadedThemes.includes(theme2) && !isSpecialTheme(theme2)) {
        if (bundledThemes[theme2]) {
          await shiki2.loadTheme(bundledThemes[theme2]);
        } else {
          themesObject[color] = "none";
        }
      }
    }
    const transformers = [
      ...baseTransformers
    ];
    for (const config of await getConfigs()) {
      const newTransformers = typeof config.shiki?.transformers === "function" ? await config.shiki?.transformers(code, lang, theme, options) : config.shiki?.transformers || [];
      transformers.push(...newTransformers);
    }
    const root = shiki2.codeToHast(code.trimEnd(), {
      lang,
      ...codeToHastOptions,
      themes: themesObject,
      transformers: [
        ...transformers,
        {
          name: "mdc:highlight",
          line(node, line) {
            if (options.highlights?.includes(line))
              addClassToHast(node, "highlight");
            node.properties.line = line;
          }
        },
        {
          name: "mdc:newline",
          line(node) {
            if (code?.includes("\n")) {
              if (node.children.length === 0 || node.children.length === 1 && node.children[0].type === "element" && node.children[0].children.length === 1 && node.children[0].children[0].type === "text" && node.children[0].children[0].value === "") {
                node.children = [{
                  type: "element",
                  tagName: "span",
                  properties: {
                    emptyLinePlaceholder: true
                  },
                  children: [{ type: "text", value: "\n" }]
                }];
                return;
              }
              const last = node.children.at(-1);
              if (last?.type === "element" && last.tagName === "span") {
                const text = last.children.at(-1);
                if (text?.type === "text")
                  text.value += "\n";
              }
            }
          }
        }
      ]
    });
    const preEl = root.children[0];
    const codeEl = preEl.children[0];
    const wrapperStyle = shikiOptions?.wrapperStyle;
    preEl.properties.style = wrapperStyle ? typeof wrapperStyle === "string" ? wrapperStyle : preEl.properties.style : "";
    const styles = [];
    Object.keys(themesObject).forEach((color) => {
      const colorScheme = color !== "default" ? `.${color}` : "";
      styles.push(
        wrapperStyle ? `${colorScheme} .shiki,` : "",
        `html .${color} .shiki span {`,
        `color: var(--shiki-${color});`,
        `background: var(--shiki-${color}-bg);`,
        `font-style: var(--shiki-${color}-font-style);`,
        `font-weight: var(--shiki-${color}-font-weight);`,
        `text-decoration: var(--shiki-${color}-text-decoration);`,
        "}"
      );
      styles.push(
        `html${colorScheme} .shiki span {`,
        `color: var(--shiki-${color});`,
        `background: var(--shiki-${color}-bg);`,
        `font-style: var(--shiki-${color}-font-style);`,
        `font-weight: var(--shiki-${color}-font-weight);`,
        `text-decoration: var(--shiki-${color}-text-decoration);`,
        "}"
      );
    });
    return {
      tree: codeEl.children,
      className: Array.isArray(preEl.properties.class) ? preEl.properties.class.join(" ") : preEl.properties.class,
      inlineStyle: preEl.properties.style,
      style: styles.join("")
    };
  };
  return highlighter;
}

const bundledLangs = {
"abap": () => import('shiki/langs/abap.mjs'),
"actionscript-3": () => import('shiki/langs/actionscript-3.mjs'),
"ada": () => import('shiki/langs/ada.mjs'),
"angular-html": () => import('shiki/langs/angular-html.mjs'),
"angular-ts": () => import('shiki/langs/angular-ts.mjs'),
"apache": () => import('shiki/langs/apache.mjs'),
"apex": () => import('shiki/langs/apex.mjs'),
"apl": () => import('shiki/langs/apl.mjs'),
"applescript": () => import('shiki/langs/applescript.mjs'),
"ara": () => import('shiki/langs/ara.mjs'),
"asciidoc": () => import('shiki/langs/asciidoc.mjs'),
"adoc": () => import('shiki/langs/asciidoc.mjs'),
"asm": () => import('shiki/langs/asm.mjs'),
"astro": () => import('shiki/langs/astro.mjs'),
"awk": () => import('shiki/langs/awk.mjs'),
"ballerina": () => import('shiki/langs/ballerina.mjs'),
"bat": () => import('shiki/langs/bat.mjs'),
"batch": () => import('shiki/langs/bat.mjs'),
"beancount": () => import('shiki/langs/beancount.mjs'),
"berry": () => import('shiki/langs/berry.mjs'),
"be": () => import('shiki/langs/berry.mjs'),
"bibtex": () => import('shiki/langs/bibtex.mjs'),
"bicep": () => import('shiki/langs/bicep.mjs'),
"blade": () => import('shiki/langs/blade.mjs'),
"bsl": () => import('shiki/langs/bsl.mjs'),
"1c": () => import('shiki/langs/bsl.mjs'),
"c": () => import('shiki/langs/c.mjs'),
"cadence": () => import('shiki/langs/cadence.mjs'),
"cdc": () => import('shiki/langs/cadence.mjs'),
"cairo": () => import('shiki/langs/cairo.mjs'),
"clarity": () => import('shiki/langs/clarity.mjs'),
"clojure": () => import('shiki/langs/clojure.mjs'),
"clj": () => import('shiki/langs/clojure.mjs'),
"cmake": () => import('shiki/langs/cmake.mjs'),
"cobol": () => import('shiki/langs/cobol.mjs'),
"codeowners": () => import('shiki/langs/codeowners.mjs'),
"codeql": () => import('shiki/langs/codeql.mjs'),
"ql": () => import('shiki/langs/codeql.mjs'),
"coffee": () => import('shiki/langs/coffee.mjs'),
"coffeescript": () => import('shiki/langs/coffee.mjs'),
"common-lisp": () => import('shiki/langs/common-lisp.mjs'),
"lisp": () => import('shiki/langs/common-lisp.mjs'),
"coq": () => import('shiki/langs/coq.mjs'),
"cpp": () => import('shiki/langs/cpp.mjs'),
"c++": () => import('shiki/langs/cpp.mjs'),
"crystal": () => import('shiki/langs/crystal.mjs'),
"csharp": () => import('shiki/langs/csharp.mjs'),
"c#": () => import('shiki/langs/csharp.mjs'),
"cs": () => import('shiki/langs/csharp.mjs'),
"css": () => import('shiki/langs/css.mjs'),
"csv": () => import('shiki/langs/csv.mjs'),
"cue": () => import('shiki/langs/cue.mjs'),
"cypher": () => import('shiki/langs/cypher.mjs'),
"cql": () => import('shiki/langs/cypher.mjs'),
"d": () => import('shiki/langs/d.mjs'),
"dart": () => import('shiki/langs/dart.mjs'),
"dax": () => import('shiki/langs/dax.mjs'),
"desktop": () => import('shiki/langs/desktop.mjs'),
"diff": () => import('shiki/langs/diff.mjs'),
"docker": () => import('shiki/langs/docker.mjs'),
"dockerfile": () => import('shiki/langs/docker.mjs'),
"dotenv": () => import('shiki/langs/dotenv.mjs'),
"dream-maker": () => import('shiki/langs/dream-maker.mjs'),
"edge": () => import('shiki/langs/edge.mjs'),
"elixir": () => import('shiki/langs/elixir.mjs'),
"elm": () => import('shiki/langs/elm.mjs'),
"emacs-lisp": () => import('shiki/langs/emacs-lisp.mjs'),
"elisp": () => import('shiki/langs/emacs-lisp.mjs'),
"erb": () => import('shiki/langs/erb.mjs'),
"erlang": () => import('shiki/langs/erlang.mjs'),
"erl": () => import('shiki/langs/erlang.mjs'),
"fennel": () => import('shiki/langs/fennel.mjs'),
"fish": () => import('shiki/langs/fish.mjs'),
"fluent": () => import('shiki/langs/fluent.mjs'),
"ftl": () => import('shiki/langs/fluent.mjs'),
"fortran-fixed-form": () => import('shiki/langs/fortran-fixed-form.mjs'),
"f": () => import('shiki/langs/fortran-fixed-form.mjs'),
"for": () => import('shiki/langs/fortran-fixed-form.mjs'),
"f77": () => import('shiki/langs/fortran-fixed-form.mjs'),
"fortran-free-form": () => import('shiki/langs/fortran-free-form.mjs'),
"f90": () => import('shiki/langs/fortran-free-form.mjs'),
"f95": () => import('shiki/langs/fortran-free-form.mjs'),
"f03": () => import('shiki/langs/fortran-free-form.mjs'),
"f08": () => import('shiki/langs/fortran-free-form.mjs'),
"f18": () => import('shiki/langs/fortran-free-form.mjs'),
"fsharp": () => import('shiki/langs/fsharp.mjs'),
"f#": () => import('shiki/langs/fsharp.mjs'),
"fs": () => import('shiki/langs/fsharp.mjs'),
"gdresource": () => import('shiki/langs/gdresource.mjs'),
"gdscript": () => import('shiki/langs/gdscript.mjs'),
"gdshader": () => import('shiki/langs/gdshader.mjs'),
"genie": () => import('shiki/langs/genie.mjs'),
"gherkin": () => import('shiki/langs/gherkin.mjs'),
"git-commit": () => import('shiki/langs/git-commit.mjs'),
"git-rebase": () => import('shiki/langs/git-rebase.mjs'),
"gleam": () => import('shiki/langs/gleam.mjs'),
"glimmer-js": () => import('shiki/langs/glimmer-js.mjs'),
"gjs": () => import('shiki/langs/glimmer-js.mjs'),
"glimmer-ts": () => import('shiki/langs/glimmer-ts.mjs'),
"gts": () => import('shiki/langs/glimmer-ts.mjs'),
"glsl": () => import('shiki/langs/glsl.mjs'),
"gnuplot": () => import('shiki/langs/gnuplot.mjs'),
"go": () => import('shiki/langs/go.mjs'),
"graphql": () => import('shiki/langs/graphql.mjs'),
"gql": () => import('shiki/langs/graphql.mjs'),
"groovy": () => import('shiki/langs/groovy.mjs'),
"hack": () => import('shiki/langs/hack.mjs'),
"haml": () => import('shiki/langs/haml.mjs'),
"handlebars": () => import('shiki/langs/handlebars.mjs'),
"hbs": () => import('shiki/langs/handlebars.mjs'),
"haskell": () => import('shiki/langs/haskell.mjs'),
"hs": () => import('shiki/langs/haskell.mjs'),
"haxe": () => import('shiki/langs/haxe.mjs'),
"hcl": () => import('shiki/langs/hcl.mjs'),
"hjson": () => import('shiki/langs/hjson.mjs'),
"hlsl": () => import('shiki/langs/hlsl.mjs'),
"html": () => import('shiki/langs/html.mjs'),
"html-derivative": () => import('shiki/langs/html-derivative.mjs'),
"http": () => import('shiki/langs/http.mjs'),
"hxml": () => import('shiki/langs/hxml.mjs'),
"hy": () => import('shiki/langs/hy.mjs'),
"imba": () => import('shiki/langs/imba.mjs'),
"ini": () => import('shiki/langs/ini.mjs'),
"properties": () => import('shiki/langs/ini.mjs'),
"java": () => import('shiki/langs/java.mjs'),
"javascript": () => import('shiki/langs/javascript.mjs'),
"js": () => import('shiki/langs/javascript.mjs'),
"jinja": () => import('shiki/langs/jinja.mjs'),
"jison": () => import('shiki/langs/jison.mjs'),
"json": () => import('shiki/langs/json.mjs'),
"json5": () => import('shiki/langs/json5.mjs'),
"jsonc": () => import('shiki/langs/jsonc.mjs'),
"jsonl": () => import('shiki/langs/jsonl.mjs'),
"jsonnet": () => import('shiki/langs/jsonnet.mjs'),
"jssm": () => import('shiki/langs/jssm.mjs'),
"fsl": () => import('shiki/langs/jssm.mjs'),
"jsx": () => import('shiki/langs/jsx.mjs'),
"julia": () => import('shiki/langs/julia.mjs'),
"jl": () => import('shiki/langs/julia.mjs'),
"kotlin": () => import('shiki/langs/kotlin.mjs'),
"kt": () => import('shiki/langs/kotlin.mjs'),
"kts": () => import('shiki/langs/kotlin.mjs'),
"kusto": () => import('shiki/langs/kusto.mjs'),
"kql": () => import('shiki/langs/kusto.mjs'),
"latex": () => import('shiki/langs/latex.mjs'),
"lean": () => import('shiki/langs/lean.mjs'),
"lean4": () => import('shiki/langs/lean.mjs'),
"less": () => import('shiki/langs/less.mjs'),
"liquid": () => import('shiki/langs/liquid.mjs'),
"log": () => import('shiki/langs/log.mjs'),
"logo": () => import('shiki/langs/logo.mjs'),
"lua": () => import('shiki/langs/lua.mjs'),
"luau": () => import('shiki/langs/luau.mjs'),
"make": () => import('shiki/langs/make.mjs'),
"makefile": () => import('shiki/langs/make.mjs'),
"markdown": () => import('shiki/langs/markdown.mjs'),
"md": () => import('shiki/langs/markdown.mjs'),
"marko": () => import('shiki/langs/marko.mjs'),
"matlab": () => import('shiki/langs/matlab.mjs'),
"mdc": () => import('shiki/langs/mdc.mjs'),
"mdx": () => import('shiki/langs/mdx.mjs'),
"mermaid": () => import('shiki/langs/mermaid.mjs'),
"mmd": () => import('shiki/langs/mermaid.mjs'),
"mipsasm": () => import('shiki/langs/mipsasm.mjs'),
"mips": () => import('shiki/langs/mipsasm.mjs'),
"mojo": () => import('shiki/langs/mojo.mjs'),
"move": () => import('shiki/langs/move.mjs'),
"narrat": () => import('shiki/langs/narrat.mjs'),
"nar": () => import('shiki/langs/narrat.mjs'),
"nextflow": () => import('shiki/langs/nextflow.mjs'),
"nf": () => import('shiki/langs/nextflow.mjs'),
"nginx": () => import('shiki/langs/nginx.mjs'),
"nim": () => import('shiki/langs/nim.mjs'),
"nix": () => import('shiki/langs/nix.mjs'),
"nushell": () => import('shiki/langs/nushell.mjs'),
"nu": () => import('shiki/langs/nushell.mjs'),
"objective-c": () => import('shiki/langs/objective-c.mjs'),
"objc": () => import('shiki/langs/objective-c.mjs'),
"objective-cpp": () => import('shiki/langs/objective-cpp.mjs'),
"ocaml": () => import('shiki/langs/ocaml.mjs'),
"pascal": () => import('shiki/langs/pascal.mjs'),
"perl": () => import('shiki/langs/perl.mjs'),
"php": () => import('shiki/langs/php.mjs'),
"plsql": () => import('shiki/langs/plsql.mjs'),
"po": () => import('shiki/langs/po.mjs'),
"pot": () => import('shiki/langs/po.mjs'),
"potx": () => import('shiki/langs/po.mjs'),
"polar": () => import('shiki/langs/polar.mjs'),
"postcss": () => import('shiki/langs/postcss.mjs'),
"powerquery": () => import('shiki/langs/powerquery.mjs'),
"powershell": () => import('shiki/langs/powershell.mjs'),
"ps": () => import('shiki/langs/powershell.mjs'),
"ps1": () => import('shiki/langs/powershell.mjs'),
"prisma": () => import('shiki/langs/prisma.mjs'),
"prolog": () => import('shiki/langs/prolog.mjs'),
"proto": () => import('shiki/langs/proto.mjs'),
"protobuf": () => import('shiki/langs/proto.mjs'),
"pug": () => import('shiki/langs/pug.mjs'),
"jade": () => import('shiki/langs/pug.mjs'),
"puppet": () => import('shiki/langs/puppet.mjs'),
"purescript": () => import('shiki/langs/purescript.mjs'),
"python": () => import('shiki/langs/python.mjs'),
"py": () => import('shiki/langs/python.mjs'),
"qml": () => import('shiki/langs/qml.mjs'),
"qmldir": () => import('shiki/langs/qmldir.mjs'),
"qss": () => import('shiki/langs/qss.mjs'),
"r": () => import('shiki/langs/r.mjs'),
"racket": () => import('shiki/langs/racket.mjs'),
"raku": () => import('shiki/langs/raku.mjs'),
"perl6": () => import('shiki/langs/raku.mjs'),
"razor": () => import('shiki/langs/razor.mjs'),
"reg": () => import('shiki/langs/reg.mjs'),
"regexp": () => import('shiki/langs/regexp.mjs'),
"regex": () => import('shiki/langs/regexp.mjs'),
"rel": () => import('shiki/langs/rel.mjs'),
"riscv": () => import('shiki/langs/riscv.mjs'),
"rst": () => import('shiki/langs/rst.mjs'),
"ruby": () => import('shiki/langs/ruby.mjs'),
"rb": () => import('shiki/langs/ruby.mjs'),
"rust": () => import('shiki/langs/rust.mjs'),
"rs": () => import('shiki/langs/rust.mjs'),
"sas": () => import('shiki/langs/sas.mjs'),
"sass": () => import('shiki/langs/sass.mjs'),
"scala": () => import('shiki/langs/scala.mjs'),
"scheme": () => import('shiki/langs/scheme.mjs'),
"scss": () => import('shiki/langs/scss.mjs'),
"sdbl": () => import('shiki/langs/sdbl.mjs'),
"1c-query": () => import('shiki/langs/sdbl.mjs'),
"shaderlab": () => import('shiki/langs/shaderlab.mjs'),
"shader": () => import('shiki/langs/shaderlab.mjs'),
"shellscript": () => import('shiki/langs/shellscript.mjs'),
"bash": () => import('shiki/langs/shellscript.mjs'),
"sh": () => import('shiki/langs/shellscript.mjs'),
"shell": () => import('shiki/langs/shellscript.mjs'),
"zsh": () => import('shiki/langs/shellscript.mjs'),
"shellsession": () => import('shiki/langs/shellsession.mjs'),
"console": () => import('shiki/langs/shellsession.mjs'),
"smalltalk": () => import('shiki/langs/smalltalk.mjs'),
"solidity": () => import('shiki/langs/solidity.mjs'),
"soy": () => import('shiki/langs/soy.mjs'),
"closure-templates": () => import('shiki/langs/soy.mjs'),
"sparql": () => import('shiki/langs/sparql.mjs'),
"splunk": () => import('shiki/langs/splunk.mjs'),
"spl": () => import('shiki/langs/splunk.mjs'),
"sql": () => import('shiki/langs/sql.mjs'),
"ssh-config": () => import('shiki/langs/ssh-config.mjs'),
"stata": () => import('shiki/langs/stata.mjs'),
"stylus": () => import('shiki/langs/stylus.mjs'),
"styl": () => import('shiki/langs/stylus.mjs'),
"svelte": () => import('shiki/langs/svelte.mjs'),
"swift": () => import('shiki/langs/swift.mjs'),
"system-verilog": () => import('shiki/langs/system-verilog.mjs'),
"systemd": () => import('shiki/langs/systemd.mjs'),
"talonscript": () => import('shiki/langs/talonscript.mjs'),
"talon": () => import('shiki/langs/talonscript.mjs'),
"tasl": () => import('shiki/langs/tasl.mjs'),
"tcl": () => import('shiki/langs/tcl.mjs'),
"templ": () => import('shiki/langs/templ.mjs'),
"terraform": () => import('shiki/langs/terraform.mjs'),
"tf": () => import('shiki/langs/terraform.mjs'),
"tfvars": () => import('shiki/langs/terraform.mjs'),
"tex": () => import('shiki/langs/tex.mjs'),
"toml": () => import('shiki/langs/toml.mjs'),
"ts-tags": () => import('shiki/langs/ts-tags.mjs'),
"lit": () => import('shiki/langs/ts-tags.mjs'),
"tsv": () => import('shiki/langs/tsv.mjs'),
"tsx": () => import('shiki/langs/tsx.mjs'),
"turtle": () => import('shiki/langs/turtle.mjs'),
"twig": () => import('shiki/langs/twig.mjs'),
"typescript": () => import('shiki/langs/typescript.mjs'),
"ts": () => import('shiki/langs/typescript.mjs'),
"typespec": () => import('shiki/langs/typespec.mjs'),
"tsp": () => import('shiki/langs/typespec.mjs'),
"typst": () => import('shiki/langs/typst.mjs'),
"typ": () => import('shiki/langs/typst.mjs'),
"v": () => import('shiki/langs/v.mjs'),
"vala": () => import('shiki/langs/vala.mjs'),
"vb": () => import('shiki/langs/vb.mjs'),
"cmd": () => import('shiki/langs/vb.mjs'),
"verilog": () => import('shiki/langs/verilog.mjs'),
"vhdl": () => import('shiki/langs/vhdl.mjs'),
"viml": () => import('shiki/langs/viml.mjs'),
"vim": () => import('shiki/langs/viml.mjs'),
"vimscript": () => import('shiki/langs/viml.mjs'),
"vue": () => import('shiki/langs/vue.mjs'),
"vue-html": () => import('shiki/langs/vue-html.mjs'),
"vyper": () => import('shiki/langs/vyper.mjs'),
"vy": () => import('shiki/langs/vyper.mjs'),
"wasm": () => import('shiki/langs/wasm.mjs'),
"wenyan": () => import('shiki/langs/wenyan.mjs'),
"文言": () => import('shiki/langs/wenyan.mjs'),
"wgsl": () => import('shiki/langs/wgsl.mjs'),
"wikitext": () => import('shiki/langs/wikitext.mjs'),
"mediawiki": () => import('shiki/langs/wikitext.mjs'),
"wiki": () => import('shiki/langs/wikitext.mjs'),
"wolfram": () => import('shiki/langs/wolfram.mjs'),
"wl": () => import('shiki/langs/wolfram.mjs'),
"xml": () => import('shiki/langs/xml.mjs'),
"xsl": () => import('shiki/langs/xsl.mjs'),
"yaml": () => import('shiki/langs/yaml.mjs'),
"yml": () => import('shiki/langs/yaml.mjs'),
"zenscript": () => import('shiki/langs/zenscript.mjs'),
"zig": () => import('shiki/langs/zig.mjs'),
};
const bundledThemes = {
"dracula-soft": () => import('shiki/themes/dracula-soft.mjs').then(r => r.default),
};
const options = {};
const engine = createWasmOnigEngine(() => import('shiki/wasm'));
const highlighter = createShikiHighlighter({ bundledLangs, bundledThemes, options, getMdcConfigs, engine });

export { createShikiHighlighter, highlighter as default };
