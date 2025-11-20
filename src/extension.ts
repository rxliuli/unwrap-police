import * as vscode from 'vscode'
import { UnwrapDecorator } from './decorator'

export function activate(context: vscode.ExtensionContext) {
  const decorator = new UnwrapDecorator()

  // Update decorations for active editor
  if (vscode.window.activeTextEditor) {
    decorator.updateDecorations(vscode.window.activeTextEditor)
  }

  // Listen for active editor changes
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(editor => {
      decorator.updateDecorations(editor)
    })
  )

  // Listen for document changes
  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument(event => {
      const editor = vscode.window.activeTextEditor
      if (editor && event.document === editor.document) {
        decorator.updateDecorations(editor)
      }
    })
  )

  // Add decorator to subscriptions for proper cleanup
  context.subscriptions.push(decorator)
}

export function deactivate() {}
