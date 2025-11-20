import * as vscode from 'vscode'

export class UnwrapDecorator {
  private decorationType: vscode.TextEditorDecorationType
  private statusBarItem: vscode.StatusBarItem

  constructor() {
    // Create decoration type with red background and red text
    this.decorationType = vscode.window.createTextEditorDecorationType({
      backgroundColor: '#ff000033',
      color: '#ff0000',
      borderRadius: '3px',
    })

    // Create status bar item
    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Right,
      100,
    )
    this.statusBarItem.show()
  }

  public updateDecorations(editor: vscode.TextEditor | undefined) {
    if (!editor || editor.document.languageId !== 'rust') {
      this.statusBarItem.hide()
      return
    }

    const decorations: vscode.DecorationOptions[] = []

    // Process line by line to skip comments
    for (let i = 0; i < editor.document.lineCount; i++) {
      const line = editor.document.lineAt(i)
      const lineText = line.text

      // Find comment start position
      const commentIndex = lineText.indexOf('//')
      const searchText =
        commentIndex >= 0 ? lineText.substring(0, commentIndex) : lineText

      // Regex to match .unwrap()
      const regex = /\.unwrap\(\)/g
      let match: RegExpExecArray | null

      while ((match = regex.exec(searchText)) !== null) {
        const startPos = new vscode.Position(i, match.index)
        const endPos = new vscode.Position(i, match.index + match[0].length)

        const decoration: vscode.DecorationOptions = {
          range: new vscode.Range(startPos, endPos),
          hoverMessage:
            '⚠️ Potential panic point detected! Remember Cloudflare? 🔥',
        }

        decorations.push(decoration)
      }
    }

    editor.setDecorations(this.decorationType, decorations)

    // Update status bar
    this.statusBarItem.text = `🚨 Unwraps: ${decorations.length}`
    this.statusBarItem.show()
  }

  public dispose() {
    this.decorationType.dispose()
    this.statusBarItem.dispose()
  }
}
