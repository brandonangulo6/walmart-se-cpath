//It wants the code written in java but saved in a .js file which is strange but those were the instructions
//I updated this after seeing the example solution because I realized they wanted the input in the constructor to be num of children not the power

import java.util.ArrayList;

public class PowerOfTwoMaxHeap<T extends Comparable<T>> {
    private final int childrenPerNode;
    private final ArrayList<T> heap;

    public PowerOfTwoMaxHeap(int childrenPerNode) {
        validateChildrenPerNode(childrenPerNode);
        this.childrenPerNode = childrenPerNode;
        this.heap = new ArrayList<>();
    }

    private void validateChildrenPerNode(int childrenPerNode) {
        if (childrenPerNode <= 0) {
            throw new IllegalArgumentException("childrenPerNode must be greater than 0");
        }
        double logResult = Math.log(childrenPerNode) / Math.log(2);
        if (logResult != Math.floor(logResult)) {
            throw new IllegalArgumentException("childrenPerNode must be a power of 2");
        }
    }

    public void insert(T item) {
        heap.add(item);
        int index = heap.size() - 1;
        while (index > 0) {
            index = bubbleUp(index);
        }
    }

    private int bubbleUp(int index) {
        T current = heap.get(index);
        int parentIndex = (index - 1) / childrenPerNode;

        if (parentIndex >= 0) {
            T parent = heap.get(parentIndex);
            if (current.compareTo(parent) > 0) {
                heap.set(index, parent);
                heap.set(parentIndex, current);
                return parentIndex;
            }
        }

        return -1;
    }

    public T popMax() {
        if (heap.isEmpty()) return null;

        T max = heap.get(0);

        if (heap.size() == 1) {
            heap.remove(0);
            return max;
        }

        T lastItem = heap.remove(heap.size() - 1);
        heap.set(0, lastItem);

        int index = 0;
        while (index >= 0) {
            index = heapifyDown(index);
        }

        return max;
    }

    private int heapifyDown(int index) {
        T parent = heap.get(index);
        T largest = parent;
        int largestIndex = -1;

        for (int i = 1; i <= childrenPerNode; i++) {
            int childIndex = index * childrenPerNode + i;
            if (childIndex >= heap.size()) break;

            T child = heap.get(childIndex);
            if (child.compareTo(largest) > 0) {
                largest = child;
                largestIndex = childIndex;
            }
        }

        if (largestIndex != -1) {
            heap.set(index, largest);
            heap.set(largestIndex, parent);
            return largestIndex;
        }

        return -1;
    }

    public boolean isEmpty() {
        return heap.isEmpty();
    }

    public int size() {
        return heap.size();
    }
}