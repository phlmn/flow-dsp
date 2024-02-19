import ReactFlow, {
  Handle,
  NodeProps,
  Position,
  useUpdateNodeInternals,
} from "reactflow";
import clsx from "clsx";

import "reactflow/dist/style.css";
import { useEffect } from "react";

function BaseNode({
  title,
  width = 180,
  children,
  selected,
}: {
  title: string;
  width?: number;
  children: React.ReactNode;
  selected: boolean;
}) {
  return (
    <div
      style={{ width }}
      className={clsx("bg-neutral-700", "rounded-md", "border-2", {
        "border-black": !selected,
        "border-white": selected,
      })}
    >
      <div className="bg-neutral-900 text-white px-2 py-1 text-sm rounded-t-[4px]">
        {title}
      </div>
      <div className="p-2">{children}</div>
    </div>
  );
}

function AudioHandle({
  isConnectable,
  input,
  output,
  id,
}: {
  isConnectable: boolean;
  id: string;
  input?: boolean;
  output?: boolean;
}) {
  return (
    <div className="relative">
      {id}
      {input && (
        <Handle
          isConnectable={isConnectable}
          type={"target"}
          position={Position.Left}
          id={id}
          style={{
            position: "absolute",
            top: "50%",
            background: "green",
            width: "10px",
            height: "10px",
            left: "-14px",
          }}
        />
      )}
      {output && (
        <Handle
          isConnectable={isConnectable}
          type={"source"}
          position={Position.Right}
          id={id}
          style={{
            position: "absolute",
            top: "50%",
            background: "green",
            width: "10px",
            height: "10px",
            right: "-14px",
          }}
        />
      )}
    </div>
  );
}

function InputNode({ id, data, isConnectable, selected }: NodeProps) {
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, updateNodeInternals]);

  return (
    <BaseNode title="Input" selected={selected}>
      <input
        className="nodrag"
        onChange={data.onChange}
        defaultValue={data.channel}
      />
      <AudioHandle output isConnectable={isConnectable} id="channel_1" />
    </BaseNode>
  );
}

function OutputNode({ data, isConnectable, selected }: NodeProps) {
  return (
    <BaseNode title="Output" selected={selected}>
      <input
        className="nodrag"
        onChange={data.onChange}
        defaultValue={data.channel}
      />

      <AudioHandle input isConnectable={isConnectable} id="channel_1" />
    </BaseNode>
  );
}

function GainNode({ data, isConnectable, selected }: NodeProps) {
  return (
    <BaseNode title="Gain" selected={selected}>
      <input
        className="nodrag"
        onChange={data.onChange}
        defaultValue={data.channel}
      />
      <AudioHandle input output isConnectable={isConnectable} id="channel_1" />
      <AudioHandle input output isConnectable={isConnectable} id="channel_2" />
    </BaseNode>
  );
}

function MixNode({ data, isConnectable, selected }: NodeProps) {
  return (
    <BaseNode title="Mix" selected={selected}>
      <input
        className="nodrag"
        onChange={data.onChange}
        defaultValue={data.channel}
      />
      <AudioHandle input isConnectable={isConnectable} id="channel_1" />
      <AudioHandle input isConnectable={isConnectable} id="channel_2" />
      <AudioHandle output isConnectable={isConnectable} id="channel_mix" />
    </BaseNode>
  );
}

function FilterNode({ data, isConnectable, selected }: NodeProps) {
  return (
    <BaseNode title="Filter" selected={selected}>
      <input
        className="nodrag"
        onChange={data.onChange}
        defaultValue={data.channel}
      />
      <AudioHandle input output isConnectable={isConnectable} id="channel_1" />
      <AudioHandle input output isConnectable={isConnectable} id="channel_2" />
    </BaseNode>
  );
}

function DelayNode({ data, isConnectable, selected }: NodeProps) {
  return (
    <BaseNode title="Delay" selected={selected}>
      <input
        className="nodrag"
        onChange={data.onChange}
        defaultValue={data.channel}
      />
      <AudioHandle input output isConnectable={isConnectable} id="channel_1" />
    </BaseNode>
  );
}

function InvertNode({ data, isConnectable, selected }: NodeProps) {
  return (
    <BaseNode title="Invert" selected={selected}>
      <input
        className="nodrag"
        onChange={data.onChange}
        defaultValue={data.channel}
      />
      <AudioHandle input output isConnectable={isConnectable} id="channel_1" />
    </BaseNode>
  );
}

function SplitNode({ data, isConnectable, selected }: NodeProps) {
  return (
    <BaseNode title="Split" selected={selected}>
      <input
        className="nodrag"
        onChange={data.onChange}
        defaultValue={data.channel}
      />
      <AudioHandle input isConnectable={isConnectable} id="channel_1" />
      <AudioHandle output isConnectable={isConnectable} id="channel_1" />
      <AudioHandle output isConnectable={isConnectable} id="channel_2" />
    </BaseNode>
  );
}

function CrossoverNode({ isConnectable, selected }: NodeProps) {
  return (
    <BaseNode title="Crossover" selected={selected}>
      <AudioHandle input isConnectable={isConnectable} id="channel_1" />
      <AudioHandle input isConnectable={isConnectable} id="channel_2" />
      <AudioHandle output isConnectable={isConnectable} id="channel_1_high" />
      <AudioHandle output isConnectable={isConnectable} id="channel_1_low" />
      <AudioHandle output isConnectable={isConnectable} id="channel_2_high" />
      <AudioHandle output isConnectable={isConnectable} id="channel_2_low" />
    </BaseNode>
  );
}

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "1" },
    type: "audioInput",
  },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" }, type: "filter" },
  {
    id: "3",
    position: { x: 0, y: 200 },
    data: { label: "1" },
    type: "audioInput",
  },
  { id: "4", position: { x: 0, y: 300 }, data: { label: "2" }, type: "filter" },
  {
    id: "5",
    position: { x: 0, y: 400 },
    data: { label: "2" },
    type: "audioOutput",
  },
  {
    id: "6",
    position: { x: 0, y: 400 },
    data: { label: "2" },
    type: "audioOutput",
  },
  {
    id: "7",
    position: { x: 0, y: 400 },
    data: { label: "2" },
    type: "audioOutput",
  },
  {
    id: "8",
    position: { x: 0, y: 400 },
    data: { label: "2" },
    type: "audioOutput",
  },
  {
    id: "9",
    position: { x: 0, y: 500 },
    data: { label: "2" },
    type: "crossover",
  },
  {
    id: "10",
    position: { x: 0, y: 300 },
    data: {},
    type: "filter",
  },
  {
    id: "11",
    position: { x: 0, y: 300 },
    data: {},
    type: "delay",
  },
  {
    id: "12",
    position: { x: 0, y: 300 },
    data: {},
    type: "delay",
  },
  {
    id: "13",
    position: { x: 0, y: 300 },
    data: {},
    type: "delay",
  },
  {
    id: "14",
    position: { x: 0, y: 300 },
    data: {},
    type: "delay",
  },
  {
    id: "15",
    position: { x: 0, y: 300 },
    data: {},
    type: "gain",
  },
  {
    id: "16",
    position: { x: 0, y: 300 },
    data: {},
    type: "gain",
  },
  {
    id: "17",
    position: { x: 0, y: 300 },
    data: {},
    type: "gain",
  },
  {
    id: "18",
    position: { x: 0, y: 300 },
    data: {},
    type: "gain",
  },
  {
    id: "19",
    position: { x: 0, y: 300 },
    data: {},
    type: "gain",
  },
  {
    id: "20",
    position: { x: 0, y: 300 },
    data: {},
    type: "gain",
  },
  {
    id: "21",
    position: { x: 0, y: 0 },
    data: { label: "1" },
    type: "audioInput",
  },
  {
    id: "22",
    position: { x: 0, y: 0 },
    data: { label: "1" },
    type: "mix",
  },
  {
    id: "23",
    position: { x: 0, y: 0 },
    data: { label: "1" },
    type: "mix",
  },
  {
    id: "24",
    position: { x: 0, y: 0 },
    data: { label: "1" },
    type: "split",
  },
  {
    id: "25",
    position: { x: 0, y: 0 },
    data: { label: "1" },
    type: "split",
  },
  {
    id: "26",
    position: { x: 0, y: 0 },
    data: { label: "1" },
    type: "invert",
  },
];
const initialEdges = [
  { id: "e1-2", source: "1", target: "2", targetHandle: "channel_1" },
  { id: "e3-4", source: "3", target: "4", targetHandle: "channel_2" },
];

const nodeTypes = {
  audioInput: InputNode,
  filter: FilterNode,
  audioOutput: OutputNode,
  crossover: CrossoverNode,
  gain: GainNode,
  delay: DelayNode,
  mix: MixNode,
  split: SplitNode,
  invert: InvertNode,
};

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        defaultNodes={initialNodes}
        defaultEdges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ maxZoom: 1 }}
        minZoom={0.3}
      />
    </div>
  );
}
