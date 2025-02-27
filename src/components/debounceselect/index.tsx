import { Select, Spin } from 'antd';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { pageTagUsingPost } from "@/services/PNUserCenter/tagController";

const DebounceSelect = ({ debounceTimeout = 800, ...props }) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<any[]>([]);
  const [selectedValues, setSelectedValues] = useState<any[]>([]); // 新增：存储选中的标签
  const [query, setQuery] = useState<number>(0);
  const [tagParam, setTagParam] = useState<API.TagParam>({ current: 1, size: 10 });

  const debounceFetcher = useMemo(() => {
    const loadOptions = debounce(async (value: string) => {
      setOptions([]); // 清空当前选项，准备加载新的标签
      setTagParam({ current: 1, size: 10 });
      setQuery(prev => prev + 1); // 触发数据请求
    }, debounceTimeout);
    return loadOptions;
  }, [debounceTimeout]);

  // 查询标签数据
  useEffect(() => {
    let isActive = true;
    setFetching(true);

    // 发起 API 请求
    pageTagUsingPost({ ...tagParam }).then(({ code, data }) => {
      if (isActive && code === 200 && data?.records) {
        const newOptions = data.records.map((item) => ({
          key: item?.tagId,
          label: item?.tagName,
          value: item?.tagName,
        }));

        // 过滤已选中的标签，去掉已经选中的标签
        const filteredOptions = newOptions.filter(option => !selectedValues.some(val => val.value === option.value));

        setOptions(filteredOptions);
      }
      setFetching(false);
    }).catch((error) => {
      console.error('加载数据失败:', error);
    });

    return () => {
      isActive = false;
    };
  }, [query, selectedValues, tagParam]);

  // 选中标签变化
  const handleChange = (newValues: any) => {
    setSelectedValues(newValues); // 更新选中的标签
    props.onChange?.(newValues); // 调用父级传入的回调
  };

  const handleClear = () => {
    setOptions([]);
    setTagParam({ current: 1, size: 10 });
    setSelectedValues([]); // 清空选中的标签
  };

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target as HTMLDivElement;
    if (scrollTop + clientHeight === scrollHeight) {
      //@ts-ignore
      setTagParam((prev) => ({ ...prev, current: prev.current + 1 }));
      setQuery((prev) => prev + 1); // 触发加载更多
    }
  };

  return (
    <Select
      allowClear
      placeholder="请选择标签"
      optionLabelProp="value"
      showSearch={true}
      labelInValue
      mode="multiple"
      filterOption={false}
      onSearch={debounceFetcher}
      onChange={handleChange}
      onClear={handleClear}
      onPopupScroll={handleScroll}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
};

export default DebounceSelect;
