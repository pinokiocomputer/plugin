const path = require('path')
module.exports = {
  menu: async (kernel, info) => {
    let venvs = await info.venv()
    let terminal

    if (venvs.length > 0) {
      let terminals = []
//      let terminals = [{
//        icon: "fa-solid fa-terminal",
//        text: "No venv",
//        shell: {
//          input: true
//        }
//      }]
      try {
        for(let venv of venvs) {
          let parsed = path.parse(venv)
          terminals.push({
            icon: "fa-brands fa-python",
            text: "[venv] " + parsed.name,
            shell: {
              venv: venv,
              input: true,
            }
          })
        }
      } catch (e) {
        console.log(e)
      }
      terminal = {
        icon: "fa-solid fa-terminal",
        text: "Terminal",
        menu: terminals
      }
    } else {
      terminal = {
        icon: "fa-solid fa-terminal",
        text: "Terminal",
        shell: {
          input: true
        }
      }
    }
    return [
      {
        text: "Dev",
        icon: "fa-solid fa-code",
        menu: [
          terminal,
          {
            image: "/asset/plugin/dev/claude.png",
            text: "Claude Code",
            href: "/run/plugin/dev/claude.json",
            params: {
              cwd: info.cwd()
            },
          },
          {
            image: "/asset/plugin/dev/openai.webp",
            text: "OpenAI Codex",
            href: "/run/plugin/dev/codex.json",
            params: {
              cwd: info.cwd()
            },
          },
          {
            image: "/asset/plugin/dev/cursor.jpeg",
            text: "Cursor",
            run: {
              message: "cursor .",
              path: info.cwd()
            }
          },
          {
            image: "/asset/plugin/dev/windsurf.png",
            text: "Windsurf",
            run: {
              message: "windsurf .",
              path: info.cwd()
            }
          },
          {
            icon: "fa-solid fa-rotate",
            text: "Update",
            shell: {
              message: "git pull",
              path: kernel.path("plugin")
            }
          }
        ],
      },
    ]
  }
}
