<?php
namespace Techm\CurrencyConverter\Controller\Index;
class Index extends \Magento\Framework\App\Action\Action {
    protected $pageFactory;
    public function __construct
    (
        \Magento\Framework\App\Action\Context $c,
        \Magento\Framework\View\Result\PageFactory $p
     )
     {
        parent::__construct($c);
        $this->pageFactory=$p;
     }
    public function execute(){
        return $this->pageFactory->create();
    }
}
