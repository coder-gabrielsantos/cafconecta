'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Minus, Plus, Search, Send, ShoppingBasket } from 'lucide-react';
import { medications } from '@/data/mock';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type CartItem = { name: string; quantity: number; suggested: number };

export default function NewRequestPage() {
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<CartItem[]>([
    { name: 'Paracetamol 500mg', quantity: 200, suggested: 180 },
    { name: 'Dipirona 500mg', quantity: 150, suggested: 140 },
  ]);
  const [observation, setObservation] = useState('');
  const [feedback, setFeedback] = useState('');

  const filtered = useMemo(() => medications.filter((item) => `${item.name} ${item.form} ${item.category}`.toLowerCase().includes(search.toLowerCase())).slice(0, 5), [search]);

  const addItem = (name: string) => {
    if (cart.some((item) => item.name === name)) return;
    setCart((current) => [...current, { name, quantity: 1, suggested: 100 }]);
  };
  const setQuantity = (name: string, quantity: number) => setCart((current) => current.map((item) => item.name === name ? { ...item, quantity: Math.max(1, quantity) } : item));
  const sendRequest = () => {
    setFeedback('Solicitação SOL-008 enviada para análise da CAF.');
    setCart([]);
  };

  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    void Promise.resolve(context.registerTool({
      name: 'create_medication_request',
      title: 'Criar solicitação de medicamentos',
      description: 'Cria e envia uma solicitação de medicamentos da UBS Dr. Fernando Couto para análise da CAF.',
      inputSchema: {
        type: 'object',
        properties: {
          items: { type: 'array', minItems: 1, items: { type: 'object', properties: { name: { type: 'string' }, quantity: { type: 'integer', minimum: 1 } }, required: ['name', 'quantity'], additionalProperties: false } },
          observation: { type: 'string' },
        },
        required: ['items'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        const value = input as { items?: { name?: string; quantity?: number }[]; observation?: string };
        if (!Array.isArray(value.items) || value.items.length === 0 || value.items.some((item) => !item.name || !Number.isInteger(item.quantity) || Number(item.quantity) < 1)) throw new Error('Informe ao menos um medicamento e uma quantidade inteira positiva.');
        setCart(value.items.map((item) => ({ name: item.name!, quantity: item.quantity!, suggested: 100 })));
        setObservation(value.observation ?? '');
        setFeedback('Solicitação criada e enviada para análise da CAF.');
        return { id: 'SOL-008', status: 'Pendente', itemCount: value.items.length };
      },
    }, { signal: lifecycle.signal })).catch(() => undefined);
    return () => lifecycle.abort();
  }, []);

  return (
    <div className="space-y-6">
      <Link href="/ubs/solicitacoes" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-700"><ArrowLeft className="size-4" />Voltar às solicitações</Link>
      <PageHeader eyebrow="UBS Dr. Fernando Couto" title="Nova solicitação" description="Selecione os medicamentos necessários e revise as quantidades antes do envio." />
      {feedback && <div role="status" className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"><CheckCircle2 className="size-5" />{feedback}</div>}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_400px]">
        <div className="space-y-6">
          <Card className="border-0 shadow-sm ring-1 ring-slate-200/90">
            <CardHeader className="border-b"><CardTitle className="text-lg">Adicionar medicamentos</CardTitle><p className="text-xs text-slate-500">Busque pelo princípio ativo, nome ou categoria.</p></CardHeader>
            <CardContent>
              <div className="relative"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" /><Input value={search} onChange={(event) => setSearch(event.target.value)} className="h-11 pl-10" placeholder="Ex.: amoxicilina, paracetamol…" aria-label="Buscar medicamento" /></div>
              <div className="mt-4 divide-y rounded-xl border">
                {filtered.map((medicine) => <div key={medicine.name} className="flex items-center justify-between gap-4 p-3.5"><div><p className="text-sm font-semibold text-slate-800">{medicine.name}</p><p className="mt-0.5 text-xs text-slate-500">{medicine.form} · {medicine.category}</p></div><Button variant={cart.some((item) => item.name === medicine.name) ? 'secondary' : 'outline'} size="sm" disabled={cart.some((item) => item.name === medicine.name)} onClick={() => addItem(medicine.name)}>{cart.some((item) => item.name === medicine.name) ? 'Adicionado' : <><Plus />Adicionar</>}</Button></div>)}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm ring-1 ring-slate-200/90">
            <CardHeader className="border-b"><CardTitle className="text-lg">Observação e justificativa</CardTitle></CardHeader>
            <CardContent className="space-y-2"><Label htmlFor="observation">Contexto da solicitação</Label><Textarea id="observation" value={observation} onChange={(event) => setObservation(event.target.value)} className="min-h-28" placeholder="Informe campanhas, aumento de demanda ou outra justificativa relevante…" /></CardContent>
          </Card>
        </div>

        <Card className="h-fit border-0 shadow-sm ring-1 ring-slate-200/90 xl:sticky xl:top-24">
          <CardHeader className="border-b"><CardTitle className="flex items-center gap-2 text-lg"><ShoppingBasket className="size-5 text-blue-700" />Resumo da solicitação</CardTitle><p className="text-xs text-slate-500">{cart.length} {cart.length === 1 ? 'medicamento selecionado' : 'medicamentos selecionados'}</p></CardHeader>
          <CardContent className="space-y-4">
            {cart.length === 0 ? <div className="rounded-xl border border-dashed p-6 text-center text-sm text-slate-500">Nenhum medicamento no resumo.</div> : cart.map((item) => <div key={item.name} className="rounded-xl border p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-sm font-semibold">{item.name}</p><p className="mt-0.5 text-xs text-slate-500">Sugestão: {item.suggested} unidades</p></div><button className="text-xs text-red-600 hover:underline" onClick={() => setCart((current) => current.filter((cartItem) => cartItem.name !== item.name))}>Remover</button></div><div className="mt-3 flex items-center justify-between"><span className="text-xs text-slate-500">Quantidade</span><div className="flex items-center gap-1"><Button variant="outline" size="icon-sm" aria-label={`Diminuir ${item.name}`} onClick={() => setQuantity(item.name, item.quantity - 1)}><Minus /></Button><Input aria-label={`Quantidade de ${item.name}`} type="number" min={1} value={item.quantity} onChange={(event) => setQuantity(item.name, Number(event.target.value))} className="h-8 w-20 text-center" /><Button variant="outline" size="icon-sm" aria-label={`Aumentar ${item.name}`} onClick={() => setQuantity(item.name, item.quantity + 1)}><Plus /></Button></div></div>{item.quantity > item.suggested && <p className="mt-2 rounded-md bg-amber-50 px-2 py-1.5 text-[11px] text-amber-800">Acima do estoque mínimo sugerido ({item.suggested} un.).</p>}</div>)}
            <div className="space-y-2 border-t pt-4"><Button variant="outline" className="h-11 w-full" disabled={!cart.length} onClick={() => setFeedback('Rascunho salvo neste dispositivo.')}>Salvar rascunho</Button><Button className="h-11 w-full" disabled={!cart.length} onClick={sendRequest}><Send />Enviar para análise</Button></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
