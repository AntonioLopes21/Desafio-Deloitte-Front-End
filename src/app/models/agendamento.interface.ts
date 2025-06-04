export interface Agendamento {
    id: number;
    clienteId: number;
    profissionalId: number;
    servicoId: number;
    dataHoraInicio: string;
    dataHoraFim: string;
    status: 'AGENDADO' | 'CONCLUIDO' | 'CANCELADO_CLIENTE' | 'CANCELADO_PROFISSIONAL';
    // Adicione outras propriedades conforme necessário
} 