  <template>
    <div class="contanin">
      <div class="showIMg"></div>
      <ul>
        <li><img src="@/assets/images/bg5.jpeg" alt=""></li>
        <li><img src="@/assets/images/bg6.jpeg" alt=""></li>
        <li><img src="@/assets/images/bg7.jpeg" alt=""></li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { nextTick } from 'vue';
  
  nextTick(()=>{
    let domImg = document.querySelector('.showIMg');
    let imgs = document.querySelectorAll('.contanin ul img')
    let show = true
    imgs.forEach(img=>{
        img.addEventListener("click",function(){
            if(show){
                domImg.style.backgroundImage = `url(${this.src})`
                imgs.forEach(item=>item.classList.remove('active'))
                this.classList.add('active');
                show=false;
                setTimeout(()=>show=true,1000)
            }
        })
    })
  })
  
  </script>
  
 <style lang="scss" scoped>
 .contanin{
    height: 300px;
    position: relative;
    padding-top: 10px;
    background: linear-gradient(to bottom,pink,skyblue);
    .showIMg{
        width: 240px;
        height: 160px;
        padding-top: 10px;
        background: url('@/assets/images/bg5.jpeg') no-repeat center / cover;
        border-radius: 5px;
        box-shadow: 2px 2px 2px 2px rgba($color: #000000, $alpha: .1);
        transition: all 1s ease-in-out;
        margin:0px auto;
        margin-bottom: 10px;
    }
    ul{
        list-style: none;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap:15px;
        padding: 0 10px;
        li{
            flex:1;
            height: 50px;
            cursor: pointer;
           
            img{
                width: 100%;
                height: 100%;
                border-radius: 3px;
                box-shadow: 2px 2px 2px 2px rgba($color: #000000, $alpha: .1);
                &.active{
                  border:2px solid skyblue;
                }
            }
        }
    }
 }

</style>
