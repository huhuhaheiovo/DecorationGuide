Page({
    data: {
      totalAmount: 0
    },
  
    onLoad: function() {
      const costData = getApp().globalData.costData;
      this.setData({
        totalAmount: costData.totalAmount
      });
      
      // 等待页面渲染完成后再绘制
      wx.nextTick(() => {
        this.drawTable(costData.items);
      });
    },
  
    drawTable: function(items) {
      const query = wx.createSelectorQuery();
      query.select('#myCanvas')
        .fields({ node: true, size: true })
        .exec((res) => {
          const canvas = res[0].node;
          const ctx = canvas.getContext('2d');
          
          // 设置画布尺寸
          const dpr = wx.getSystemInfoSync().pixelRatio;
          canvas.width = res[0].width * dpr;
          canvas.height = items.length * 50 * dpr + 100; // 根据项目数量动态设置高度
          ctx.scale(dpr, dpr);
          
          // 设置字体
          ctx.font = '14px sans-serif';
          ctx.textBaseline = 'middle';
          
          // 绘制表头
          ctx.fillStyle = 'rgba(205, 231, 190, 0.2)';
          ctx.fillRect(0, 0, canvas.width, 50);
          
          ctx.fillStyle = '#CDE7BE';
          ctx.fillText('项目', 20, 25);
          ctx.fillText('金额', canvas.width/dpr - 120, 25);
          
          // 绘制数据行
          items.forEach((item, index) => {
            const y = (index + 1) * 50;
            
            // 绘制交替背景
            if (index % 2 === 0) {
              ctx.fillStyle = 'rgba(205, 231, 190, 0.1)';
              ctx.fillRect(0, y, canvas.width, 50);
            }
            
            // 绘制文本
            ctx.fillStyle = '#FFFFFF';
            ctx.fillText(item.title, 20, y + 25);
            ctx.fillText(item.value, canvas.width/dpr - 120, y + 25);
          });
        });
    }
  });