
import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  const renderLine = (line: string) => {
    // Note: This is a simplified regex-based approach.
    const formattedLine = line
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-100">$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
      .replace(/`(.*?)`/g, '<code class="bg-slate-900 text-purple-300 px-1.5 py-0.5 rounded-md font-mono text-sm ring-1 ring-slate-600">$1</code>'); // Inline code

    return <span dangerouslySetInnerHTML={{ __html: formattedLine }} />;
  };

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let listItems: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      const commonListClasses = "space-y-1 my-2 pl-5";
      if (listType === 'ul') {
        elements.push(<ul key={`list-${elements.length}`} className={`list-disc ${commonListClasses}`}>{listItems}</ul>);
      } else if (listType === 'ol') {
        elements.push(<ol key={`list-${elements.length}`} className={`list-decimal ${commonListClasses}`}>{listItems}</ol>);
      }
      listItems = [];
      listType = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${elements.length}`} className="bg-slate-900 p-3 rounded-lg overflow-x-auto my-2 ring-1 ring-slate-600">
            <code className="font-mono text-sm text-slate-300">{codeBlockContent.join('\n')}</code>
          </pre>
        );
        codeBlockContent = [];
        inCodeBlock = false;
      } else {
        flushList();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    const ulMatch = line.match(/^(\s*)[-*]\s+(.*)/);
    const olMatch = line.match(/^(\s*)\d+\.\s+(.*)/);

    if (ulMatch) {
      if (listType !== 'ul') {
        flushList();
        listType = 'ul';
      }
      listItems.push(<li key={`li-${elements.length}-${listItems.length}`}>{renderLine(ulMatch[2])}</li>);
    } else if (olMatch) {
      if (listType !== 'ol') {
        flushList();
        listType = 'ol';
      }
      listItems.push(<li key={`li-${elements.length}-${listItems.length}`}>{renderLine(olMatch[2])}</li>);
    } else {
      flushList();
      if (line.trim() !== '') {
        elements.push(<p key={`p-${elements.length}`} className="my-1">{renderLine(line)}</p>);
      }
    }
  }

  flushList();
  
  if (inCodeBlock && codeBlockContent.length > 0) {
      elements.push(
          <pre key={`code-${elements.length}`} className="bg-slate-900 p-3 rounded-lg overflow-x-auto my-2 ring-1 ring-slate-600">
            <code className="font-mono text-sm text-slate-300">{codeBlockContent.join('\n')}</code>
          </pre>
        );
  }

  return <div>{elements}</div>;
};

export default MarkdownRenderer;
